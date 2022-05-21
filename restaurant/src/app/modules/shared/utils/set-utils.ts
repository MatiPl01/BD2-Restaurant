const areDifferent = <T>(
  set1: Set<T>, 
  set2: Set<T>
): boolean => {
  for (const val of set1) {
    if (!set2.has(val)) return true;
  }
  for (const val of set2) {
    if (!set1.has(val)) return true;
  }
  return false;
}

const convertToSortedArray = <T>(
  set: Set<any>, 
  compareFn?: (a: T, b: T) => number
): any[] => {
  const array = [...set];
  array.sort(compareFn);
  return array;
}


export default {
  areDifferent,
  convertToSortedArray
};
