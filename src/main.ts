import './style.css';
import { GameTimer } from './timer';
import { renderFirstScreen } from './firstScreen';
import { multArrays, Cart } from './lib/utilityFunctions';

const appElement: HTMLElement | null = document.querySelector('.app');

type Difficulty = {
    buttonText: string;
    cartsCount: number;
    layout: {
        rows: number;
        columns: number;
    };
};

declare global {
    interface Window {
        appState: {
            difficulty: string;
            gameDuration: number;
            status: string;
        };
        timer: GameTimer;
        DIFFICULTIES: {
            low: Difficulty;
            medium: Difficulty;
            high: Difficulty;
        };
        CARTS: Cart[];
        STATUSES: {
            ok: string;
            win: string;
            lose: string;
        };
        END_MESSAGE: {
            win: string;
            lose: string;
        };
        END_IMAGE_PATH: {
            win: string;
            lose: string;
        };
        OPACITY: number;
    }
}

window.appState = {
    difficulty: '',
    gameDuration: 0,
    status: '',
};

window.timer = new GameTimer();

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

window.CARTS = multArrays(SUITS, RANKS, 'suit', 'rank');

window.STATUSES = {
    ok: 'ok',
    win: 'win',
    lose: 'lose',
};

window.END_MESSAGE = {
    win: 'Вы выиграли!',
    lose: 'Вы проиграли',
};

window.END_IMAGE_PATH = {
    win: './static/end_win.svg',
    lose: './static/end_lose.svg',
};

window.OPACITY = 0.3;

console.log(window.CARTS);

if (appElement !== null) {
    renderFirstScreen(appElement);
}

export { appElement };