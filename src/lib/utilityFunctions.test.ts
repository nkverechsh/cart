const { it, describe, expect } = require('@jest/globals');
const {
    multArrays,
    takeCarts,
    takeCartsForPlay,
    Cart,
} = require('./utilityFunctions');

describe('multArrays', () => {
    it('should length 15', () => {
        const array1 = ['a', 'b', 'c'];
        const array2 = ['I', 'II', 'III', 'IV', 'V'];

        const result = multArrays(array1, array2, 'letter', 'romanNumerals');

        expect(result).toHaveLength(15);
    });

    it('should substitute the correct property names', () => {
        const array1 = ['a'];
        const array2 = ['I'];
        const prop1Name = 'letter';
        const prop2Name = 'romanNumerals';

        const multipliedArray = multArrays(
            array1,
            array2,
            prop1Name,
            prop2Name
        );
        const propNames = Object.keys(multipliedArray[0]);
        const isIncludesNames =
            propNames.includes(prop1Name) && propNames.includes(prop2Name);

        expect(isIncludesNames).toBe(true);
    });
});

describe('takeCarts', () => {
    it('should return the right amount', () => {
        const set = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
        ]as typeof Cart[];

        const taked1 = takeCarts(4, set);
        const taked2 = takeCarts(15, set);
        const taked3 = takeCarts(-4, set);

        expect(taked1).toHaveLength(4);
        expect(taked2).toHaveLength(10);
        expect(taked3).toHaveLength(0);
    });

    it('should check that the output structure is the same as an input', () => {
        const set = [
            {
                id: 1,
                suit: 'hearts',
                rank: '6',
            },
        ];

        const taked = takeCarts(1, set);

        expect(taked).toEqual(set);
    });
});

describe('takeCartsForPlay', () => {
    it('should return the right amount', () => {
        Object.defineProperty(global, 'window', {
            value: {
                CARTS: [
                    {
                        id: 1,
                        suit: 'hearts',
                        rank: '6',
                    },
                ],
            },
            writable: true,
        });
        const count = 2;

        const takedCarts = takeCartsForPlay(count);

        expect(takedCarts).toHaveLength(count);
    });
});