const areDifferent = (set1: Set<any>, set2: Set<any>): boolean => {
  for (const val of set1) {
    if (!set2.has(val)) return true;
  }
  for (const val of set2) {
    if (!set1.has(val)) return true;
  }
  return false;
}


export default {
  areDifferent
};
