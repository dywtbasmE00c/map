export function getAttrs(array, attr) {
  let arr = array.map((item) => {
    return item[attr];
  });
  return arr;
}

export function getObjData(array, uname, value) {
  let objArr = array.map((item) => {
    return {
      name: item[uname],
      value: item[value]
    }
  })
  return objArr;
}
