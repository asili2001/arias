import { checkDateInRange, isDateString } from "./dateUtils";
import { gatherValuesByPath } from "./objectUtils";
import { Filter } from ".";
import { DynamicObject } from ".";
import { Operation } from "./types/Filter";

/**
 * Filters an array of objects based on an array of filters.
 * 
 * @param {T[]} arr - The array to be filtered.
 * @param {Filter[]} filters - An array of filter objects.
 * @returns {T[]} - The filtered array.
 */
export const genericFilter = <T>(arr: T[], filters: Filter[]): T[] => {

    const applyOperation = (values: number[], operation: Operation) => {
        switch (operation) {
            case "+":
                return values.reduce((acc, val) => acc + val, 0);
            case "-":
                return values.reduce((acc, val) => acc - val);
            case "*":
                return values.reduce((acc, val) => acc * val, 1);
            case "/":
                return values.reduce((acc, val, index) => index === 0 ? val : acc / val);
            default:
                return values[0];
        }
    };


    return filters.reduce((filteredData, filter) => {
        switch (filter.type) {
            case "numberRange":
                return filteredData.filter(item => {
                    const values = gatherValuesByPath(item as DynamicObject, filter.path[0], true) as number[];
                    if (values === undefined || values.length === 0) return false;

                    filter.operation = filter.operation || "none";

                    const result = applyOperation(values, filter.operation);
                    return result >= filter.value[0] && result <= filter.value[1];
                });


            case "singleSelect":
                return filteredData.filter(item => {
                    const value = gatherValuesByPath(item as DynamicObject, filter.path[0], false)[0] as string | number;
                    return value !== undefined && value === filter.value;
                });

            case "multiSelect":
                return filteredData.filter(item => {
                    const values = gatherValuesByPath(item as DynamicObject, filter.path[0], false) as unknown[];
                    return values !== undefined && values.some(value => filter.value.includes(value));
                });

            case "dateRangeInRange":
                return filteredData.filter(item => {
                    const minStartDate = gatherValuesByPath(item as DynamicObject, filter.path[0], false)[0] as string;
                    const maxEndDate = gatherValuesByPath(item as DynamicObject, filter.path[1], false)[0] as string;

                    if (minStartDate && maxEndDate && isDateString(minStartDate) && isDateString(maxEndDate)) {
                        return checkDateInRange([minStartDate, maxEndDate], filter.value[0], filter.value[1], true);
                    } else {
                        console.error(`Invalid date format: ${minStartDate}, ${maxEndDate}`);
                        return false;
                    }
                });
            case "dateInRange":
                return filteredData.filter(item => {
                    const selectedDate = gatherValuesByPath(item as DynamicObject, filter.path[0], false)[0] as string;

                    if (selectedDate && isDateString(selectedDate)) {
                        return checkDateInRange([selectedDate], filter.value[0], filter.value[1], true);
                    } else {
                        console.error(`Invalid date format: ${selectedDate}`);
                        return false;
                    }
                });

            default:
                return filteredData;
        }
    }, arr);
};

/**
 * Splits an array into chunks of a specified size.
 * 
 * @param {T[]} array - The array to chunk.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} - The array split into chunks.
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
    if (size <= 0) throw new Error('Size must be a positive number');
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, size + i));
    }
    return result;
};
