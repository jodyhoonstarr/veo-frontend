import { FILTERS } from "@/constants/filters";

// provides shortcut functions to selecting options in the filers bar
export function filterSelect(datatype, dropdown, selection = "") {
  // selection options can be
  // primary secondary tertiary
  // earnings [25, 50, 75, all] [y1, y5, y10, all]
  // counts [emp, nonemp, all] [y1, y5, y10, all]

  if (dropdown === "primary") {
    if (["earnings", "counts"].includes(datatype)) {
      return [FILTERS.filters.find(o => o.id === datatype)];
    }
  }

  if (dropdown === "secondary") {
    const datatypeFilters = FILTERS.filters.find(o => o.id === datatype);
    if (
      datatypeFilters &&
      datatype === "earnings" &&
      ["p25", "p50", "p75", "all"].includes(selection)
    ) {
      const percentile = datatypeFilters.filters.find(
        o => o.id === "percentile"
      );
      if (selection === "all") {
        return percentile.filters;
      } else {
        return [percentile.filters.find(o => o.id === selection)];
      }
    }

    // setting nonemp cannot currently be defaulted because
    // of the handling for the 3rd filter
    if (
      datatypeFilters &&
      datatype === "counts" &&
      ["emp", "all"].includes(selection)
    ) {
      if (selection === "all") {
        return datatypeFilters.filters;
      } else {
        return [datatypeFilters.filters.find(o => o.id === selection)];
      }
    }
  }

  if (dropdown === "tertiary") {
    const datatypeFilters = FILTERS.filters.find(o => o.id === datatype);
    if (
      datatype === "earnings" &&
      ["y1", "y5", "y10", "all"].includes(selection)
    ) {
      const earningsFilters = datatypeFilters.filters.find(
        o => o.id === "year"
      );
      if (selection === "all") {
        return earningsFilters.filters;
      } else {
        return [earningsFilters.filters.find(o => o.id === selection)];
      }
    }

    if (
      datatype === "counts" &&
      ["y1", "y5", "y10", "all"].includes(selection)
    ) {
      const empFilters = datatypeFilters.filters.find(o => o.id === "emp");
      const countsFilters = empFilters.filters.find(o => o.id === "year");
      if (selection === "all") {
        return countsFilters.filters;
      } else {
        return [countsFilters.filters.find(o => o.id === selection)];
      }
    }
  }
}
