/**
 * Checks if a given string is in the yyyy-mm-dd date format.
 * 
 * @param {string} str - The string to be tested.
 * @returns {boolean} - True if the string is in the yyyy-mm-dd format, false otherwise.
 */
export function isDateString(str: string): boolean {
    // Regex pattern to match yyyy-mm-dd format
    const regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(str);
}
