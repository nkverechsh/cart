function clearElement(element) {
  element.textContent = "";
}

function mixArrays(array1, array2, prop1Name, prop2Name) {
  const resultArray = [];
  let id = 1;
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      resultArray.push({
        id: id,
        [prop1Name]: array1[i],
        [prop2Name]: array2[j],
      });
      id++;
    }
  }
  return resultArray;
}

export { clearElement, mixArrays };
