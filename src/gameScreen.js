import { templateEngine } from "./lib/templateEngine.js";
import { clearElement, takeCartsForPlay } from "./lib/utilityFunctions.js";
import { renderFirstScreen } from "./firstScreen.js";
import { appElement } from "./main.js";

const imgPath = "./static";
function renderGameScreen(component) {
  console.log(`Игра на сложности ${window.appState.difficulty}`);
  component.appendChild(templateEngine(gameScreenTemplate()));
  setTimer(component);
  setPlayAgainHandler(component);
  const timeoutForRemember = setTimeout(() => {
    console.log("5 секунд прошли");
    turnAllCards(component);
    window.timer.run();
    setCartClickHandler(component);
    clearTimeout(timeoutForRemember);
  }, 5000);
}
function setPlayAgainHandler(component) {
  const button = component.querySelector(".button");
  button.addEventListener("click", () => {
    clearElement(component);
    renderFirstScreen(appElement);
    window.timer.clear();
  });
}
function setTimer(component) {
  const minutesElement = component.querySelector(".timer__min .timer__value");
  const secondsElement = component.querySelector(".timer__sec .timer__value");
  window.timer.setTimeElements(minutesElement, secondsElement);
}

function setCartClickHandler(component) {
  const cartsField = component.querySelector(".field");
  const doCheck = createChecker();
  cartsField.addEventListener("click", cartClickHandler);

  function cartClickHandler(event) {
    const { target } = event;
    const cart = target.closest(".cart");
    if (!cart || cart.dataset.side === "front") {
      return;
    }
    turnCart(cart);
    processResult(doCheck(cart));
  }

  function processResult(result) {
    if (result !== "ok") {
      cartsField.removeEventListener("click", cartClickHandler);
      window.timer.clear();
    }
    if (result === "win") {
      alert("Вы победили!");
    }
    if (result === "lose") {
      alert("Вы проиграли!");
    }
  }
}

function createChecker() {
  let counter = 0;
  let previousCart = null;
  let isEqual;
  const difficulty = window.appState.difficulty;
  const cartsCount = window.DIFFICULTIES[difficulty].cartsCount;
  function doCheck(cart) {
    counter = counter + 1;
    if (counter % 2 === 1) {
      previousCart = cart;
      return "ok";
    } else {
      isEqual = previousCart.dataset.id === cart.dataset.id;
      if (!isEqual) {
        return "lose";
      } else {
        if (counter === cartsCount) {
          return "win";
        }
        return "ok";
      }
    }
  }
  return doCheck;
}

function turnCart(cartElement) {
  const { suit, rank, side } = cartElement.dataset;
  console.log(rank, suit, side);
  if (side === "front") {
    cartElement
      .querySelector(".cart__front")
      .classList.add("cart__front_hidden");
    cartElement
      .querySelector(".cart__back")
      .classList.remove("cart__back_hidden");
    cartElement.dataset.side = "back";
  }
  if (side === "back") {
    cartElement.querySelector(".cart__back").classList.add("cart__back_hidden");
    cartElement
      .querySelector(".cart__front")
      .classList.remove("cart__front_hidden");
    cartElement.dataset.side = "front";
  }
}
function turnAllCards(component) {
  const carts = component.querySelectorAll(".cart");
  carts.forEach(turnCart);
}
function gameScreenTemplate() {
  return {
    tag: "div",
    cls: "screen",
    content: {
      tag: "div",
      cls: "game",
      content: [
        {
          tag: "div",
          cls: "header",
          content: [
            {
              tag: "div",
              cls: "timer",
              content: [
                {
                  tag: "div",
                  cls: "timer__min",
                  content: [
                    {
                      tag: "div",
                      cls: "timer__label",
                      content: "min",
                    },
                    {
                      tag: "div",
                      cls: "timer__value",
                      content: "00",
                    },
                  ],
                },
                {
                  tag: "div",
                  cls: "timer__value",
                  content: ".",
                },
                {
                  tag: "div",
                  cls: "timer__sec",
                  content: [
                    {
                      tag: "div",
                      cls: "timer__label",
                      content: "sec",
                    },
                    {
                      tag: "div",
                      cls: "timer__value",
                      content: "00",
                    },
                  ],
                },
              ],
            },
            {
              tag: "button",
              cls: "button",
              content: "Начать заново",
            },
          ],
        },
        {
          tag: "div",
          cls: "field",
          attrs: setGridStyle(),
          content: renderCarts(),
        },
      ],
    },
  };
}
function setGridStyle() {
  const difficulty = window.appState.difficulty;
  const layout = window.DIFFICULTIES[difficulty].layout;
  return {
    style: `grid-template-columns: repeat(${layout.columns}, 1fr);grid-template-rows: repeat(${layout.rows}, 1fr);`,
  };
}

function renderCarts() {
  const difficulty = window.appState.difficulty;
  const cartsCount = window.DIFFICULTIES[difficulty].cartsCount;
  console.log("Количество карт: " + cartsCount);
  const carts = takeCartsForPlay(cartsCount);
  return carts.map(renderCart);
}

function renderCart(cart) {
  const { suit, rank, id } = cart;
  console.log("Карта № " + id);
  return {
    tag: "div",
    cls: "cart",
    attrs: {
      "data-id": id,
      "data-suit": suit,
      "data-rank": rank,
      "data-side": "front",
    },
    content: [
      {
        tag: "div",
        cls: ["cart__front"],
        attrs: {
          style: `background-image: url('${imgPath}/${rank.toLowerCase()}_${suit}.svg');`,
        },
      },
      {
        tag: "div",
        cls: ["cart__back", "cart__back_hidden"],
        attrs: {
          style: `background-image: url('${imgPath}/shirt.svg');`,
        },
      },
    ],
  };
}
export { renderGameScreen };
