import { Timer } from './timer.js';
import { renderFirstScreen } from './firstScreen.js';
import { mixArrays } from './lib/utilityFunctions.js';

const appElement = document.querySelector('.app');

window.appState = {
    difficulty: null,
    gameDuration: 0,
};

window.timer = new Timer();

window.DIFFICULTIES = {
    low: {
        buttonText: '1',
        cartsCount: 6,
        layout: {
            rows: 2,
            columns: 3,
        },
    },
    medium: {
        buttonText: '2',
        cartsCount: 12,
        layout: {
            rows: 3,
            columns: 4,
        },
    },
    high: {
        buttonText: '3',
        cartsCount: 18,
        layout: {
            rows: 3,
            columns: 6,
        },
    },
};

const SUITS = ['hearts', 'diamonds', 'crosses', 'spades'];

const RANKS = ['6', '7', '8', '9', '10', 'Q', 'K', 'J', 'A'];

window.CARTS = mixArrays(SUITS, RANKS, 'suit', 'rank');

console.log(window.CARTS);

renderFirstScreen(appElement);

export { appElement };