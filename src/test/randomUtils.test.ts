import { generateUUID, stringToColor } from "../randomUtils";

const stringToColorTestCases = [
    {
        input: 'hello',
        opacity: 100,
        darkness: 0,
        output: '#d218e9ff',
    },
    {
        input: 'world',
        opacity: 100,
        darkness: 0,
        output: '#921bc1ff',
    },
    {
        input: 'hello',
        opacity: 50,
        darkness: 0,
        output: '#d218e980',
    },
    {
        input: 'world',
        opacity: 100,
        darkness: 50,
        output: '#490e61ff',
    },
];


describe('stringToColor', () => {
    stringToColorTestCases.forEach(({ input, output, opacity, darkness }) => {
        it(`should return ${output} for ${input}`, () => {
            expect(stringToColor(input, opacity, darkness)).toBe(output);
        });
    });
});

describe('generateUUID', () => {
    it('should generate a UUID', () => {
        const uuid = generateUUID();
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
});
