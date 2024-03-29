import { select } from "d3-selection";
import { schemeCategory10 } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";
import { PUBLICPATH } from "@/constants/config";

// titlecase a string
const ignoreWords = ["of"];
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    if (ignoreWords.includes(txt.toLowerCase())) {
      return txt;
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// prefix a path with the public path from the config
export function joinPublicPath(str) {
  if (PUBLICPATH === "/" && str.charAt(0) === "/") {
    return str;
  } else if (PUBLICPATH !== "/" && str.charAt(0) === "/") {
    return `${PUBLICPATH}${str}`;
  } else if (PUBLICPATH !== "/" && str.charAt(0) !== "/") {
    return `${PUBLICPATH}/${str}`;
  } else {
    return `/${str}`;
  }
}

// determine if array has contents
export function arrayIsNullorEmpty(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  } else if (arr == null) {
    return true;
  } else {
    return false;
  }
}

// wrap long text
export function wrapLabels(text, width) {
  text.each(function () {
    let text, words, word, line, lineNumber, lineHeight, y, dy, tspan;
    text = select(this);
    words = text.text().split(/\s+/).reverse();
    line = [];
    lineNumber = 0;
    lineHeight = 1.1;
    y = text.attr("y");
    dy = parseFloat(text.attr("dy"));
    tspan = text
      .text(null)
      .append("tspan")
      .attr("x", 0)
      .attr("y", y)
      .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      // don't wrap if the line is a single long word
      if (tspan.node().getComputedTextLength() > width && line.length > 1) {
        line.pop();
        // if more than two lines append ... at end of line 2
        if (lineNumber < 1) {
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", function () {
              return ++lineNumber * lineHeight + dy + "em";
            })
            .text(word);
        } else if (lineNumber === 1) {
          tspan.text(`${line.join(" ")}...`);
        }
      }
    }
  });
}

// filter incoming data by an array of properties
export function filterRows(csvData, dataSelections) {
  if (
    arrayIsNullorEmpty(csvData) ||
    dataSelections.some((o) => arrayIsNullorEmpty(o.data))
  ) {
    return null;
  }

  // filter the selected rows from the data
  return csvData.filter((row) => {
    return dataSelections.every((o) =>
      o.data.some((e) => {
        if (e && Object.prototype.hasOwnProperty.call(e, "id")) {
          return e.id === row[o.prop];
        }
      })
    );
  });
}

// simplify the selected rows of data
export function simplifiyRows(
  csvDataRows,
  filters,
  activeToggleProp,
  keepCohorts = false
) {
  if (
    filters == null ||
    arrayIsNullorEmpty(filters.primary) ||
    arrayIsNullorEmpty(filters.secondary) ||
    arrayIsNullorEmpty(filters.tertiary) ||
    arrayIsNullorEmpty(csvDataRows) ||
    activeToggleProp == null
  ) {
    return null;
  }

  // get the set of available props
  const objKeys = Object.keys(csvDataRows[0]);

  // prefix the filtername with an underscore
  // e.g. [_earnings, (_emp, and/or _nonemp)]
  let underscoreFilters;
  if (filters.primary[0].id === "earnings") {
    underscoreFilters = ["_earnings"];
  } else {
    underscoreFilters = filters.secondary.map((f) => `_${f.id}`);
  }

  const dataTypeKeys = objKeys.filter((key) => {
    return (
      underscoreFilters.some((f) => key.toLocaleLowerCase().indexOf(f) > -1) &&
      key.toLocaleLowerCase().indexOf("status") === -1
    );
  });

  // get only the props defined in the filters e.g. y5 p50
  let filterKeys = dataTypeKeys.filter((key) => {
    if (filters.primary.find((o) => o.id === "earnings")) {
      return (
        filters.secondary.some((e) => key.indexOf(`${e.id}_`) > -1) &&
        filters.tertiary.some((e) => key.indexOf(`${e.id}_`) > -1)
      );
    } else if (filters.primary.find((o) => o.id === "counts")) {
      return filters.tertiary.some((e) => key.indexOf(`${e.id}_`) > -1);
    }
  });

  // keep the label for the active group
  filterKeys.push(activeToggleProp);

  // keep the cohorts if the requested
  if (keepCohorts) {
    filterKeys.push("cohort");
  }

  // filter out the row data to only keep usable props
  let usablePropsData = csvDataRows.map((row) => {
    let result = {};
    filterKeys.forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        result[key] = row[key];
      }
    });
    return result;
  });

  // order by grouped prop
  usablePropsData.sort((a, b) =>
    a[activeToggleProp] > b[activeToggleProp] ? 1 : -1
  );

  // put "E1-E9" first for paygrade/paygrade groups
  if (
    usablePropsData &&
    Object.prototype.hasOwnProperty.call(usablePropsData[0], "paygrade")
  ) {
    const allPaygrades = usablePropsData.find((o) => o.paygrade === "E1-E9");
    if (allPaygrades) {
      usablePropsData = usablePropsData.filter((o) => o !== allPaygrades);
      usablePropsData.unshift(allPaygrades);
    }
  }
  return usablePropsData;
}

// format the chart data
export function createChartData(
  csvDataRowsSimple,
  filters,
  activeToggleProp,
  dataSelections,
  keepCohorts = false
) {
  if (
    arrayIsNullorEmpty(csvDataRowsSimple) ||
    activeToggleProp == null ||
    filters == null
  ) {
    return null;
  }

  // take the selected data and get the unique data property
  // e.g. ['y1_p50', 'y5_p50'] would give ['y1', 'y5']
  const topRow = csvDataRowsSimple[0];
  let keyArray = [];
  Object.keys(topRow).map((k) => {
    if (k !== activeToggleProp && k !== "cohort") {
      keyArray.push(k.split("_"));
    }
  });

  // determine which column has the unique set of vales
  const transposeArray = keyArray.map((col, i) =>
    keyArray.map((row) => row[i])
  );
  const distinctTransposeArray = transposeArray.map((e) => [...new Set(e)]);
  let maxLen = 0;
  distinctTransposeArray.map((a) => (maxLen = Math.max(maxLen, a.length)));
  const variableColumn = distinctTransposeArray.findIndex(
    (a) => a.length === maxLen
  );

  // get the strings to represent the unique column
  let useKeys = keyArray.map((k) => k[variableColumn]);

  if (keepCohorts) {
    useKeys.push("cohort");
  }

  let data = [];
  csvDataRowsSimple.map((row) => {
    let result = {};

    // find the activetoggle label from the array of data selections
    let activeSelection = dataSelections.find(
      (o) => o.prop === activeToggleProp
    );

    // find the label using the active group
    result.label = activeSelection.data.find((obj) => {
      return obj.id === row[activeToggleProp];
    }).label;

    // create the simple data
    useKeys.forEach((k) => {
      const propName = Object.keys(row).find((prop) => {
        if (prop === "cohort") {
          return true; // if the cohort is provided, keep it
        } else if (filters.primary.find((f) => f.id === "earnings")) {
          // if earnings filter by p50_, p75_
          return prop.includes(`${k}_`);
        } else if (
          // if counts && grouped by emp/nonemp filter by _emp, _nonemp
          filters.primary.find((f) => f.id === "counts") &&
          Array.isArray(filters.secondary) &&
          filters.secondary.length > 1
        ) {
          return prop.includes(`_${k}`);
        } else {
          // otherwise just default to y1_, y5_
          return prop.includes(`${k}_`);
        }
      });
      result[k] = row[propName];
    });

    data.push(result);
  });

  return data;
}

// determine the active datatype from the filter
export function getChartDataType(filters) {
  if (
    filters &&
    Array.isArray(filters.primary) &&
    filters.primary.length >= 1 &&
    Object.prototype.hasOwnProperty.call(filters.primary[0], "id")
  ) {
    return filters.primary[0].id;
  }
}

// set the color set for the chart based on the type, filters, or selection
export function getColorSet(chartType, filters, data) {
  if (chartType === "bar") {
    // bar charts get the color set from the active filters
    if (
      filters != null &&
      Object.prototype.hasOwnProperty.call(filters, "colors")
    ) {
      return filters.colors;
    }
  } else if (chartType === "line") {
    // line charts get the colors from the number of data items
    if (data != null && Array.isArray(data) && data.length > 0) {
      const values = data.map((d, i) => i);
      const colorScale = scaleOrdinal(schemeCategory10);
      colorScale.domain(values);

      let colorsLookup = {};
      data.map((d, i) => {
        if (d != null && Object.prototype.hasOwnProperty.call(d, "label")) {
          colorsLookup[d.label] = colorScale(i);
        }
      });
      return colorsLookup;
    }
  }
}
