/**
 * Creates a debounced function that delays invoking the provided function until after a specified wait time.
 * 
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
export const debounce = (func: Function, wait: number): Function => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Creates a throttled function that only invokes the provided function at most once per specified wait time.
 * 
 * @param {Function} func - The function to throttle.
 * @param {number} wait - The number of milliseconds to throttle invocations to.
 * @returns {Function} - The throttled function.
 */
export const throttle = (func: Function, wait: number): Function => {
    let lastCalled = 0;
    return (...args: any[]) => {
        const now = new Date().getTime();
        if (now - lastCalled >= wait) {
            lastCalled = now;
            func(...args);
        }
    };
};

/**
 * Introduces a delay.
 * 
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
