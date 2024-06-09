import { generateUUID, stringToColor } from "../randomUtils";

const stringToColorTestCases = [
    {
        input: 'hello',
        output: '#d218e95a',
    },
    {
        input: 'world',
        output: '#921bc15a',
    },
];


describe('stringToColor', () => {
    stringToColorTestCases.forEach(({ input, output }) => {
        it(`should return ${output} for ${input}`, () => {
            expect(stringToColor(input)).toBe(output);
        });
    });
});

describe('generateUUID', () => {
    it('should generate a UUID', () => {
        const uuid = generateUUID();
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });
});
