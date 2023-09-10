/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/firstScreen.js":
/*!****************************!*\
  !*** ./src/firstScreen.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFirstScreen: () => (/* binding */ renderFirstScreen)
/* harmony export */ });
/* harmony import */ var _lib_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/templateEngine.js */ "./src/lib/templateEngine.js");
/* harmony import */ var _lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utilityFunctions.js */ "./src/lib/utilityFunctions.js");
/* harmony import */ var _gameScreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameScreen.js */ "./src/gameScreen.js");




function renderFirstScreen(component) {
  component.appendChild((0,_lib_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__.templateEngine)(firstScreenTemplate()));

  setDifficultyHandler(component);

  setStartHandler(component);
}

function setDifficultyHandler(component) {
  const difficultyBlock = component.querySelector(".difficulty");
  difficultyBlock.addEventListener("click", (event) => {
    const target = event.target;
    clearSelect(difficultyBlock);
    if (target.classList.contains("difficulty__button")) {
      window.appState.difficulty = target.dataset.difficulty;
      console.log(`Выбрана сложность ${window.appState.difficulty}`);
      target.classList.add("difficulty__button_selected");
    }
  });
}

function clearSelect(difficultyBlock) {
  const buttons = difficultyBlock.querySelectorAll(".difficulty__button");
  buttons.forEach((button) => {
    button.classList.remove("difficulty__button_selected");
  });
}

function setStartHandler(component) {
  const startButton = component.querySelector(".button");
  startButton.addEventListener("click", (event) => {
    event.preventDefault;
    console.log(`Открыть игру на сложности ${window.appState.difficulty}`);
    (0,_lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_1__.clearElement)(component);
    (0,_gameScreen_js__WEBPACK_IMPORTED_MODULE_2__.renderGameScreen)(component);
  });
}

function firstScreenTemplate() {
  return {
    tag: "div",
    cls: "screen",
    content: {
      tag: "div",
      cls: "window",
      content: {
        tag: "div",
        cls: "window__content",
        content: [
          {
            tag: "div",
            cls: "window__title",
            content: "Выбери сложность",
          },
          {
            tag: "div",
            cls: "difficulty",
            content: [
              templateDifficultyButton("low"),
              templateDifficultyButton("medium"),
              templateDifficultyButton("high"),
            ],
          },
          {
            tag: "button",
            cls: ["button", "window__button"],
            content: "Старт",
          },
        ],
      },
    },
  };
}

function templateDifficultyButton(difficulty) {
  return {
    tag: "div",
    cls: "difficulty__button",
    attrs: {
      "data-difficulty": `${difficulty}`,
    },
    content: `${window.DIFFICULTIES[difficulty].buttonText}`,
  };
}




/***/ }),

/***/ "./src/gameScreen.js":
/*!***************************!*\
  !*** ./src/gameScreen.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGameScreen: () => (/* binding */ renderGameScreen)
/* harmony export */ });
/* harmony import */ var _lib_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/templateEngine.js */ "./src/lib/templateEngine.js");
/* harmony import */ var _lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utilityFunctions.js */ "./src/lib/utilityFunctions.js");
/* harmony import */ var _firstScreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./firstScreen.js */ "./src/firstScreen.js");
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.js */ "./src/main.js");





const imgPath = './static';
function renderGameScreen(component) {
    console.log(`Игра на сложности ${window.appState.difficulty}`);
    component.appendChild((0,_lib_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__.templateEngine)(gameScreenTemplate()));
    setTimer(component);
    setPlayAgainHandler(component);
    const timeoutForRemember = setTimeout(() => {
        console.log('5 секунд прошли');
        turnAllCards(component);
        window.timer.run();
        setCartClickHandler(component);
        clearTimeout(timeoutForRemember);
    }, 5000);
}
function setPlayAgainHandler(component) {
    const button = component.querySelector('.button');
    button.addEventListener('click', () => {
        (0,_lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_1__.clearElement)(component);
        (0,_firstScreen_js__WEBPACK_IMPORTED_MODULE_2__.renderFirstScreen)(_main_js__WEBPACK_IMPORTED_MODULE_3__.appElement);
        window.timer.clear();
    });
}
function setTimer(component) {
    const minutesElement = component.querySelector('.timer__min .timer__value');
    const secondsElement = component.querySelector('.timer__sec .timer__value');
    window.timer.setTimeElements(minutesElement, secondsElement);
}

function setCartClickHandler(component) {
    const cartsField = component.querySelector('.field');
    const doCheck = createChecker();
    cartsField.addEventListener('click', cartClickHandler);

    function cartClickHandler(event) {
        const { target } = event;
        const cart = target.closest('.cart');
        if (!cart || cart.dataset.side === 'front') {
            return;
        }
        turnCart(cart);
        processResult(doCheck(cart));
    }

    function processResult(result) {
        if (result !== 'ok') {
            cartsField.removeEventListener('click', cartClickHandler);
            window.timer.clear();
        }
        if (result === 'win') {
            alert('Вы победили!');
        }
        if (result === 'lose') {
            alert('Вы проиграли!');
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
            return 'ok';
        } else {
            isEqual = previousCart.dataset.id === cart.dataset.id;
            if (!isEqual) {
                return 'lose';
            } else {
                if (counter === cartsCount) {
                    return 'win';
                }
                return 'ok';
            }
        }
    }
    return doCheck;
}

function turnCart(cartElement) {
    const { suit, rank, side } = cartElement.dataset;
    console.log(rank, suit, side);
    if (side === 'front') {
        cartElement
            .querySelector('.cart__front')
            .classList.add('cart__front_hidden');
        cartElement
            .querySelector('.cart__back')
            .classList.remove('cart__back_hidden');
        cartElement.dataset.side = 'back';
    }
    if (side === 'back') {
        cartElement
            .querySelector('.cart__back')
            .classList.add('cart__back_hidden');
        cartElement
            .querySelector('.cart__front')
            .classList.remove('cart__front_hidden');
        cartElement.dataset.side = 'front';
    }
}
function turnAllCards(component) {
    const carts = component.querySelectorAll('.cart');
    carts.forEach(turnCart);
}
function gameScreenTemplate() {
    return {
        tag: 'div',
        cls: 'screen',
        content: {
            tag: 'div',
            cls: 'game',
            content: [
                {
                    tag: 'div',
                    cls: 'header',
                    content: [
                        {
                            tag: 'div',
                            cls: 'timer',
                            content: [
                                {
                                    tag: 'div',
                                    cls: 'timer__min',
                                    content: [
                                        {
                                            tag: 'div',
                                            cls: 'timer__label',
                                            content: 'min',
                                        },
                                        {
                                            tag: 'div',
                                            cls: 'timer__value',
                                            content: '00',
                                        },
                                    ],
                                },
                                {
                                    tag: 'div',
                                    cls: 'timer__value',
                                    content: '.',
                                },
                                {
                                    tag: 'div',
                                    cls: 'timer__sec',
                                    content: [
                                        {
                                            tag: 'div',
                                            cls: 'timer__label',
                                            content: 'sec',
                                        },
                                        {
                                            tag: 'div',
                                            cls: 'timer__value',
                                            content: '00',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            tag: 'button',
                            cls: 'button',
                            content: 'Начать заново',
                        },
                    ],
                },
                {
                    tag: 'div',
                    cls: 'field',
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
    console.log('Количество карт: ' + cartsCount);
    const carts = (0,_lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_1__.takeCartsForPlay)(cartsCount);
    return carts.map(renderCart);
}

function renderCart(cart) {
    const { suit, rank, id } = cart;
    console.log('Карта № ' + id);
    return {
        tag: 'div',
        cls: 'cart',
        attrs: {
            'data-id': id,
            'data-suit': suit,
            'data-rank': rank,
            'data-side': 'front',
        },
        content: [
            {
                tag: 'div',
                cls: ['cart__front'],
                attrs: {
                    style: `background-image: url('${imgPath}/${rank.toLowerCase()}_${suit}.svg');`,
                },
            },
            {
                tag: 'div',
                cls: ['cart__back', 'cart__back_hidden'],
                attrs: {
                    style: `background-image: url('${imgPath}/shirt.svg');`,
                },
            },
        ],
    };
}


/***/ }),

/***/ "./src/lib/templateEngine.js":
/*!***********************************!*\
  !*** ./src/lib/templateEngine.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   templateEngine: () => (/* binding */ templateEngine)
/* harmony export */ });
function templateEngine(block) {
  if (block === undefined || block === null || block === false) {
    return document.createTextNode("");
  }
  if (
    typeof block === "string" ||
    typeof block === "number" ||
    block === true
  ) {
    return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach((item) => {
      const el = templateEngine(item);

      fragment.appendChild(el);
    });

    return fragment;
  }

  const element = document.createElement(block.tag);

  if (block.cls) {
    element.classList.add(...[].concat(block.cls).filter(Boolean));
  }

  if (block.attrs) {
    const keys = Object.keys(block.attrs);

    keys.forEach((key) => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  const content = templateEngine(block.content);

  element.appendChild(content);

  return element;
}


/***/ }),

/***/ "./src/lib/utilityFunctions.js":
/*!*************************************!*\
  !*** ./src/lib/utilityFunctions.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearElement: () => (/* binding */ clearElement),
/* harmony export */   mixArrays: () => (/* binding */ mixArrays),
/* harmony export */   takeCartsForPlay: () => (/* binding */ takeCartsForPlay)
/* harmony export */ });
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



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appElement: () => (/* binding */ appElement)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer.js */ "./src/timer.js");
/* harmony import */ var _firstScreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./firstScreen.js */ "./src/firstScreen.js");
/* harmony import */ var _lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utilityFunctions.js */ "./src/lib/utilityFunctions.js");




const appElement = document.querySelector(".app");
window.appState = {
  difficulty: null,
  gameDuration: 0,
};
window.timer = new _timer_js__WEBPACK_IMPORTED_MODULE_1__.Timer();
window.DIFFICULTIES = {
  low: {
    buttonText: "1",
    cartsCount: 6,
    layout: {
      rows: 2,
      columns: 3,
    },
  },
  medium: {
    buttonText: "2",
    cartsCount: 12,
    layout: {
      rows: 3,
      columns: 4,
    },
  },
  high: {
    buttonText: "3",
    cartsCount: 18,
    layout: {
      rows: 3,
      columns: 6,
    },
  },
};
const SUITS = ["hearts", "diamonds", "crosses", "spades"];
const RANKS = ["6", "7", "8", "9", "10", "Q", "K", "J", "A"];
window.CARTS = (0,_lib_utilityFunctions_js__WEBPACK_IMPORTED_MODULE_3__.mixArrays)(SUITS, RANKS, "suit", "rank");
console.log(window.CARTS);
(0,_firstScreen_js__WEBPACK_IMPORTED_MODULE_2__.renderFirstScreen)(appElement);



/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timer: () => (/* binding */ Timer)
/* harmony export */ });
class Timer {
  constructor() {
    console.log("new Timer");
    console.log(window.appState.gameDuration);
  }

  run() {
    const startTime = Date.now();
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      window.appState.gameDuration = currentTime - startTime;
      this.displayTime();
    }, 1000);
  }

  clear() {
    clearInterval(this.interval);
  }

  displayTime() {
    if (!this.minutesElement || !this.secondsElement) {
      return;
    }
    this.minutesElement.textContent = this.formatValues(this.getMinutes());
    this.secondsElement.textContent = this.formatValues(this.getSeconds());
  }

  getMinutes() {
    return Math.floor(window.appState.gameDuration / 60000);
  }

  getSeconds() {
    return Math.floor(window.appState.gameDuration / 1000) % 60;
  }

  formatValues(value) {
    return String(value).padStart(2, 0);
  }

  setTimeElements(minutesEment, secondsElement) {
    this.minutesElement = minutesEment;
    this.secondsElement = secondsElement;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map