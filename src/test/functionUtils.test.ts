import { debounce, sleep, throttle } from "../functionUtils";

const debounceTests = [
    {
        description: 'should return a function that debounces another function',
        data: ["hello", "hello wor", "hello world"],
        delay: 500,
        expected: "hello world"
    }
];

const throttleTests = [
    {
        description: 'should return a function that throttles another function',
        data: ["hello", "hello wor", "hello world"],
        delay: 500,
        expected: "hello"
    }
];

describe('debounce', () => {
    debounceTests.forEach(testCase => {
        const { description, delay, expected, data } = testCase;
        test(description, async () => {
            let result = "";
            const debouncedFunc = debounce((value: string) => result = value, delay);
            data.forEach(value => debouncedFunc(value));
            await sleep(delay + 50);
            expect(result).toBe(expected);
        });
    });
});

describe('throttle', () => {
    throttleTests.forEach(testCase => {
        const { description, delay, expected, data } = testCase;
        test(description, async () => {
            let result = "";
            const throttledFunc = throttle((value: string) => result = value, delay);
            data.forEach(value => throttledFunc(value));
            await sleep(delay + 50);
            expect(result).toBe(expected);
        });
    });
});

describe('sleep', () => {
    test('should return a promise that resolves after a specified delay', async () => {
        const delay = 500;
        const start = new Date().getTime();
        await sleep(delay);
        const end = new Date().getTime();
        expect(end - start).toBeGreaterThanOrEqual(delay);
    });
});
