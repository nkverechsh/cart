import { templateEngine } from "./lib/templateEngine";
import { clearElement, takeCartsForPlay } from "./lib/utilityFunctions";
import { renderFirstScreen } from "./firstScreen";
import { appElement } from "./main";
import { Cart } from "./lib/utilityFunctions";

const imgPath = "./static";

function renderGameScreen(component) {
  console.log(`Игра на сложности ${window.appState.difficulty}`);
  component.appendChild(templateEngine(gameScreenTemplate()));

  setTimer(component);
  setPlayAgainHandler(component, ".button");
  const timeoutForRemember = setTimeout(() => {
    console.log("5 секунд прошли");
    turnAllCards(component);
    window.timer.run();
    setCartClickHandler(component);
    clearTimeout(timeoutForRemember);
  }, 5000);
}

function setPlayAgainHandler(component: HTMLElement, selector: string) {
  const button = component.querySelector(selector);
  button?.addEventListener("click", () => {
    clearElement(component);
    if (appElement !== null) {
      renderFirstScreen(appElement);
      window.timer.clear();
    }
  });
}

function setTimer(component: HTMLElement) {
  const minutesElement = component.querySelector(".timer__min .timer__value");
  const secondsElement = component.querySelector(".timer__sec .timer__value");
  window.timer.setTimeElements(minutesElement, secondsElement);
}

function setCartClickHandler(component: HTMLElement) {
  const cartsField = component.querySelector(".field");
  const doCheck = createChecker();
  cartsField?.addEventListener("click", cartClickHandler);

  function cartClickHandler(event: Event) {
    const { target } = event;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const cart = target.closest(".cart");
    if (!(cart instanceof HTMLElement) || cart.dataset.side === "front") {
      return;
    }
    turnCart(cart);
    processResult(doCheck(cart));
  }

  function processResult(result: string) {
    if (result !== window.STATUSES.ok) {
      cartsField?.removeEventListener("click", cartClickHandler);
      window.timer.clear();
      const minutes: number = window.timer.getMinutes();
      const seconds: number = window.timer.getSeconds();
      const duration: string = `${minutes}.${window.timer.formatValues(
        seconds,
      )}`;
      showResult(
        component,
        endWindowTemplate(
          window.END_IMAGE_PATH[result],
          window.END_MESSAGE[result],
          duration,
        ),
      );
      setPlayAgainHandler(component, ".window .button");
    }
  }
}

function showResult(component, template) {
  const screenElement = component.querySelector(".screen");
  const gameElement = component.querySelector(".game");
  gameElement.style = `opacity: ${window.OPACITY};`;
  screenElement.appendChild(templateEngine(template));
}

function createChecker() {
  let counter: number = 0;
  let previousCart: HTMLElement;
  let isEqual: boolean;
  const difficulty: string = window.appState.difficulty;
  const cartsCount: number = window.DIFFICULTIES[difficulty].cartsCount;
  function doCheck(cart: HTMLElement) {
    counter = counter + 1;
    if (counter % 2 === 1) {
      previousCart = cart;
      return window.STATUSES.ok;
    } else {
      isEqual = previousCart.dataset.id === cart.dataset.id;
      if (!isEqual) {
        return window.STATUSES.lose;
      } else {
        if (counter === cartsCount) {
          return window.STATUSES.win;
        }
        return window.STATUSES.ok;
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

function endWindowTemplate(image: string, message: string, duration: string) {
  return {
    tag: "div",
    cls: "window",
    content: {
      tag: "div",
      cls: "window__content",
      content: [
        {
          tag: "div",
          cls: "window__image",
          content: {
            tag: "img",
            attrs: {
              src: image,
            },
          },
        },
        {
          tag: "div",
          cls: "window__title",
          content: message,
        },
        {
          tag: "div",
          cls: ["window__time-spent", "time-spent"],
          content: [
            {
              tag: "div",
              cls: "time-spent__text",
              content: "Затраченное время:",
            },
            {
              tag: "div",
              cls: "time-spent__time",
              content: duration,
            },
          ],
        },
        {
          tag: "button",
          cls: ["button", "window__button"],
          content: "Играть снова",
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

function renderCart(cart: Cart) {
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
          style: `background-image: url('${imgPath}/${rank?.toLowerCase()}_${suit}.svg');`,
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
