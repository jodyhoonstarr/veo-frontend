// generates a linearly spaced array
// returns an integer array
export function linSpace(start, stop, num) {
  const startValue = parseFloat(start);
  const stopValue = parseFloat(stop);
  const cardinality = parseFloat(num);
  let arr = [];
  let step = (stopValue - startValue) / (cardinality - 1);
  for (let i = 0; i < cardinality; i++) {
    arr.push(Math.floor(startValue + step * i));
  }
  return arr;
}
