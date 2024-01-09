// Utility function to sort an array of objects by a specific property
export function sortByProperty(arr, propertyName) {
  return arr.slice().sort((a, b) => {
    const valueA = a[propertyName];
    const valueB = b[propertyName];

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}

export function groupBy(array, keyFn) {
  const groups = {};
  for (const obj of array) {
    const key = keyFn(obj);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(obj);
  }
  return groups;
}

export function omitData(obj, keysToOmit) {
  const filteredObj = { ...obj };
  keysToOmit.forEach((key) => delete filteredObj[key]);
  return filteredObj;
}

export function findDuplicates(list, ...keys) {
  const seen = new Set();

  for (const obj of list) {
    let compositeKey = '';

    keys.forEach((key) => {
      compositeKey += `${obj[key]}-`;
    });

    if (seen.has(compositeKey)) {
      return true;
    } else {
      seen.add(compositeKey);
    }
  }

  return false;
}
