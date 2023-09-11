import { templateEngine } from './lib/templateEngine';
import { clearElement } from './lib/utilityFunctions';
import { renderGameScreen } from './gameScreen';

function renderFirstScreen(component: HTMLElement) {
    component.appendChild(templateEngine(firstScreenTemplate()));

    setDifficultyHandler(component);

    setStartHandler(component);
}

function setDifficultyHandler(component: HTMLElement) {
    const difficultyBlock = component.querySelector('.difficulty');
    if (!(difficultyBlock instanceof HTMLElement)) {
        return;
    }
    difficultyBlock.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement) {
            const target = event.target;
            clearSelect(difficultyBlock);
            if (target.classList.contains('difficulty__button')) {
                if (target.dataset.difficulty !== undefined) {
                    window.appState.difficulty = target.dataset.difficulty;
                    console.log(
                        `Выбрана сложность ${window.appState.difficulty}`
                    );
                    target.classList.add('difficulty__button_selected');
                }
            }
        }
    });
}

function clearSelect(difficultyBlock: HTMLElement) {
    const buttons = difficultyBlock.querySelectorAll('.difficulty__button');
    buttons.forEach((button) => {
        button.classList.remove('difficulty__button_selected');
    });
}

function setStartHandler(component: HTMLElement) {
    const startButton = component.querySelector('.button');
    startButton?.addEventListener('click', (event) => {
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

function templateDifficultyButton(difficulty: string) {
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