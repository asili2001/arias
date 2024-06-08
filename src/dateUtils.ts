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

/**
 * Checks if a given date or date range falls within a specified range.
 * 
 * @param {string[]} value - An array containing one or two date strings.
 * @param {string} rangeStart - The start date of the range.
 * @param {string} rangeEnd - The end date of the range.
 * @param {boolean} [strict=false] - If true, the date range must be strictly within the specified range.
 * @returns {boolean} - True if the date(s) fall within the range, false otherwise.
 */
export const checkDateInRange = (value: string[], rangeStart: string, rangeEnd: string, strict: boolean = false): boolean => {
    if (!Array.isArray(value) || value.length < 1 || value.length > 2) {
        throw new Error("Invalid input: value must be an array with one or two date strings.");
    }

    const rangeStartDate = new Date(rangeStart);
    const rangeEndDate = new Date(rangeEnd);

    if (isNaN(rangeStartDate.getTime()) || isNaN(rangeEndDate.getTime())) {
        throw new Error("Invalid range dates.");
    }

    const dateInRange = (date: Date) => date >= rangeStartDate && date <= rangeEndDate;

    if (value.length === 2) {
        const selectedStartDate = new Date(value[0]);
        const selectedEndDate = new Date(value[1]);

        if (isNaN(selectedStartDate.getTime()) || isNaN(selectedEndDate.getTime())) {
            throw new Error("Invalid selected dates.");
        }

        if (strict) {
            return selectedStartDate >= rangeStartDate && selectedEndDate <= rangeEndDate;
        } else {
            return dateInRange(selectedStartDate) || dateInRange(selectedEndDate) ||
                   (selectedStartDate <= rangeStartDate && selectedEndDate >= rangeEndDate);
        }
    } else {
        const selectedDate = new Date(value[0]);

        if (isNaN(selectedDate.getTime())) {
            throw new Error("Invalid selected date.");
        }

        return dateInRange(selectedDate);
    }
}
