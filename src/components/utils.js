import { select } from "d3-selection";
import { active } from "d3-transition";

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
  text.each(function() {
    let text, words, word, line, lineNumber, lineHeight, y, dy, tspan;
    text = select(this);
    words = text
      .text()
      .split(/\s+/)
      .reverse();
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
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", function() {
            return ++lineNumber * lineHeight + dy + "em";
          })
          .text(word);
      }
    }
  });
}

// filter incoming data by an array of properties
export function filterRows(csvData, dataSelections) {
  if (
    dataSelections.every(o => arrayIsNullorEmpty(o.data)) ||
    arrayIsNullorEmpty(csvData)
  ) {
    return null;
  }

  // filter the selected rows from the data
  return csvData.filter(row => {
    return dataSelections.every(o => o.data.some(e => e.id === row[o.prop]));
  });
}

// simplify the selected rows of data
export function simplifiyRows(csvDataRows, filters, activeToggleProp) {
  if (arrayIsNullorEmpty(filters) || arrayIsNullorEmpty(csvDataRows)) {
    return null;
  }
  // get the set of available props
  const objKeys = Object.keys(csvDataRows[0]);

  // get either earnings or emp data without the status flag
  let matchInString;
  switch (filters.type.id) {
    case "earnings":
      matchInString = "_earnings";
      break;
    case "countsemp":
      matchInString = "_emp";
      break;
    case "countsnonemp":
      matchInString = "_nonemp";
      break;
  }

  const dataTypeKeys = objKeys.filter(key => {
    return (
      key.toLocaleLowerCase().indexOf(`${matchInString}`) > -1 &&
      key.toLocaleLowerCase().indexOf("status") === -1
    );
  });

  // get only the props defined in the filters
  let filterKeys = dataTypeKeys.filter(key => {
    const f = filters.filters;
    if (
      f.hasOwnProperty("percentile") &&
      !arrayIsNullorEmpty(f.percentile) &&
      f.hasOwnProperty("year") &&
      !arrayIsNullorEmpty(f.year)
    ) {
      const p = f.percentile;
      const y = f.year;
      return (
        p.some(e => key.indexOf(`${e.id}_`) > -1) &&
        y.some(e => key.indexOf(`${e.id}_`) > -1)
      );
    } else if (f.hasOwnProperty("year") && !arrayIsNullorEmpty(f.year)) {
      const y = f.year;
      return y.some(e => key.indexOf(`${e.id}_`) > -1);
    }
  });

  // keep the label for the active group
  filterKeys.push(activeToggleProp);

  // filter out the row data to only keep usable props
  return csvDataRows.map(row => {
    let result = {};
    filterKeys.forEach(function(key) {
      if (row.hasOwnProperty(key)) {
        result[key] = row[key];
      }
    });
    return result;
  });
}

// format the chart data
export function createChartData(
  csvDataRowsSimple,
  filters,
  activeToggleProp,
  dataSelections
) {
  if (
    arrayIsNullorEmpty(csvDataRowsSimple) ||
    activeToggleProp == null ||
    filters == null ||
    !filters.hasOwnProperty("filters") ||
    filters.filters == null
  ) {
    return null;
  }

  // take the selected data and get the unique data property
  // e.g. ['y1_p50', 'y5_p50'] would give ['y1', 'y5']
  const topRow = csvDataRowsSimple[0];
  let keyArray = [];
  Object.keys(topRow).map(k => {
    if (k != activeToggleProp) {
      keyArray.push(k.split("_"));
    }
  });
  const variableColumn =
    filters &&
    filters.filters.percentile &&
    Array.isArray(filters.filters.percentile) &&
    filters.filters.percentile.length > 1
      ? 1
      : 0;

  const useKeys = keyArray.map(k => k[variableColumn]);

  let data = [];
  csvDataRowsSimple.map(row => {
    let result = {};

    // find the activetoggle label from the array of data selections
    let activeSelection = dataSelections.find(o => o.prop == activeToggleProp);

    // find the label using the active group
    result.label = activeSelection.data.find(obj => {
      return obj.id === row[activeToggleProp];
    }).label;

    // create the simple data
    useKeys.forEach(k => {
      const propName = Object.keys(row).find(prop => {
        return prop.includes(`${k}_`);
      });
      result[k] = row[propName];
    });

    data.push(result);
  });

  return data;
}
