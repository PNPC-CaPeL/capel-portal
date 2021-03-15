const findObject = (obj = {}, key, value) => {
  const result = [];

  const recursiveSearch = (obj2 = {}) => {
    if (!obj2 || typeof obj2 !== 'object') {
      return;
    }
    if (obj2[key] === value) {
      result.push(obj2);
    }
    Object.keys(obj2).forEach(k => recursiveSearch(obj2[k]));
  };

  recursiveSearch(obj);

  return result;
};

export default findObject;
