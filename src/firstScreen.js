import { templateEngine } from './lib/templateEngine.js';
import { clearElement } from './lib/utilityFunctions.js';
import { renderGameScreen } from './gameScreen.js';

function renderFirstScreen(component) {
    component.appendChild(templateEngine(firstScreenTemplate()));

    setDifficultyHandler(component);

    setStartHandler(component);
}

function setDifficultyHandler(component) {
    const difficultyBlock = component.querySelector('.difficulty');
    difficultyBlock.addEventListener('click', (event) => {
        const target = event.target;
        clearSelect(difficultyBlock);
        if (target.classList.contains('difficulty__button')) {
            window.appState.difficulty = target.dataset.difficulty;
            console.log(`Выбрана сложность ${window.appState.difficulty}`);
            target.classList.add('difficulty__button_selected');
        }
    });
}

function clearSelect(difficultyBlock) {
    const buttons = difficultyBlock.querySelectorAll('.difficulty__button');
    buttons.forEach((button) => {
        button.classList.remove('difficulty__button_selected');
    });
}

function setStartHandler(component) {
    const startButton = component.querySelector('.button');
    startButton.addEventListener('click', (event) => {
        event.preventDefault;
        console.log(`Открыть игру на сложности ${window.appState.difficulty}`);
        clearElement(component);
        renderGameScreen(component);
    });
}

function firstScreenTemplate() {
    return {
        tag: 'div',
        cls: 'screen',
        content: {
            tag: 'div',
            cls: 'window',
            content: {
                tag: 'div',
                cls: 'window__content',
                content: [
                    {
                        tag: 'div',
                        cls: 'window__title',
                        content: 'Выбери сложность',
                    },
                    {
                        tag: 'div',
                        cls: 'difficulty',
                        content: [
                            templateDifficultyButton('low'),
                            templateDifficultyButton('medium'),
                            templateDifficultyButton('high'),
                        ],
                    },
                    {
                        tag: 'button',
                        cls: ['button', 'window__button'],
                        content: 'Старт',
                    },
                ],
            },
        },
    };
}

function templateDifficultyButton(difficulty) {
    return {
        tag: 'div',
        cls: 'difficulty__button',
        attrs: {
            'data-difficulty': `${difficulty}`,
        },
        content: `${window.DIFFICULTIES[difficulty].buttonText}`,
    };
}

export { renderFirstScreen };