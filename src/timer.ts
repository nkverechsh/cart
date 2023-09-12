export class GameTimer {
    interval;
    minutesElement;
    secondsElement;
    constructor() {
        console.log('new Timer');
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
        return String(value).padStart(2, '0');
    }

    setTimeElements(minutesEment, secondsElement) {
        this.minutesElement = minutesEment;
        this.secondsElement = secondsElement;
    }
}