/* eslint-disable @typescript-eslint/no-var-requires */
const { GameTimer } = require('./timer');

describe('GameTimer', () => {
    it('should create interval by run method', () => {
        Object.defineProperty(global, 'window', {
            value: {
                appState: {
                    gameDuration: 0,
                },
            },
            writable: true,
        });
        const testTimer = new GameTimer();

        testTimer.run();
        testTimer.interval.unref();

        expect(testTimer.interval).toBeTruthy();
    });

    it('should clear interval', () => {
        Object.defineProperty(global, 'window', {
            value: {
                appState: {
                    gameDuration: 0,
                },
            },
            writable: true,
        });
        const testTimer = new GameTimer();

        testTimer.run();
        testTimer.clear();

        expect(testTimer.interval._destroyed).toBe(true);
    });

    it('should return 1 minute', () => {
        Object.defineProperty(global, 'window', {
            value: {
                appState: {
                    gameDuration: 60000,
                },
            },
            writable: true,
        });
        const testTimer = new GameTimer();

        const minutes = testTimer.getMinutes();

        expect(minutes).toEqual(1);
    });

    it('should return 30 seconds', () => {
        Object.defineProperty(global, 'window', {
            value: {
                appState: {
                    gameDuration: 90000,
                },
            },
            writable: true,
        });
        const testTimer = new GameTimer();

        const minutes = testTimer.getSeconds();

        expect(minutes).toEqual(30);
    });

    it('should show number as 2-signed string', () => {
        const testTimer = new GameTimer();
        const number = 1;

        const string = testTimer.formatValues(number);

        expect(string).toEqual('01');
    });
});