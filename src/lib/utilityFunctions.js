function clearElement(element) {
  element.textContent = '';
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

function takeCarts(count, set) {
  let cartSet = [...set];
  const takedCarts = [];
  for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * cartSet.length);
      takedCarts.push(cartSet.splice(randomIndex, 1)[0]);
  }
  return takedCarts;
}

function takeCartsForPlay(cartsCunt) {
  const pairsCount = Math.floor(cartsCunt / 2);
  const uniqCarts = takeCarts(pairsCount, window.CARTS);
  const cartsForPlay = [...uniqCarts, ...uniqCarts];
  return takeCarts(cartsForPlay.length, cartsForPlay);
}

export { clearElement, mixArrays, takeCartsForPlay };