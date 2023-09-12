interface Cart {
  id: number;
  suit?: string;
  rank?: string;
}

function clearElement(element: HTMLElement) {
  element.textContent = '';
}

function multArrays(
  array1: string[],
  array2: string[],
  prop1Name: string,
  prop2Name: string
) {
  const resultArray: Cart[] = [];
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

function takeCarts(count: number, set: Cart[]) {
  if (count > set.length) {
      count = set.length;
  }
  const cartSet = [...set];
  const takedCarts: Cart[] = [];
  for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * cartSet.length);
      takedCarts.push(cartSet.splice(randomIndex, 1)[0]);
  }
  return takedCarts;
}

function takeCartsForPlay(cartsCunt: number) {
  const pairsCount = Math.floor(cartsCunt / 2);
  const uniqCarts = takeCarts(pairsCount, window.CARTS);
  const cartsForPlay = [...uniqCarts, ...uniqCarts];
  return takeCarts(cartsForPlay.length, cartsForPlay);
}

export { clearElement, multArrays, takeCartsForPlay, Cart, takeCarts };