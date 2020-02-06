import { select } from "d3-selection";

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
