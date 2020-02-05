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
