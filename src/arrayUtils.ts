import { checkDateInRange, isDateString } from "./dateUtils";
import { gatherValuesByPath } from "./objectUtils";
import { Filter } from ".";
import { DynamicObject } from ".";
import { Operation } from "./types/Filter";
import { SortBy } from "./types/Sort";

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
                    return result >= filter.value[0] && result <= filter.value[1] || values.length === 0;

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
                        return checkDateInRange([minStartDate, maxEndDate], filter.value[0], filter.value[1], filter.strict !== undefined ? filter.strict : true);
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

/**
 * Sorts an array of objects based on a specified attribute and order.
 *
 * @template T - The type of the objects within the dataset.
 * @param {T[]} dataset - The array of objects to be sorted.
 * @param {SortBy} sortBy - An object specifying the attribute to sort by and the order of sorting.
 * @param {SortOrder} sortBy.order - The order in which to sort the dataset ("asc" for ascending or "desc" for descending).
 * @param {string} sortBy.attribute - The attribute of the objects to sort by. This can be a nested attribute specified using dot notation.
 * @returns {T[]} A new array containing the sorted objects.
 *
 * @example
 * // Given the dataset:
 * const dataset = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ];
 *
 * // To sort by age in ascending order:
 * const sortedByAgeAsc = sortDataset(dataset, { order: "asc", attribute: "age" });
 * console.log(sortedByAgeAsc);
 * // Output: [
 * //   { name: "Bob", age: 25 },
 * //   { name: "Alice", age: 30 },
 * //   { name: "Charlie", age: 35 }
 * // ]
 *
 * // To sort by name in descending order:
 * const sortedByNameDesc = sortDataset(dataset, { order: "desc", attribute: "name" });
 * console.log(sortedByNameDesc);
 * // Output: [
 * //   { name: "Charlie", age: 35 },
 * //   { name: "Bob", age: 25 },
 * //   { name: "Alice", age: 30 }
 * // ]
 */
export const sortDataset = <T>(dataset: T[], sortBy: SortBy): T[] => {
    // Create a shallow copy of the dataset to avoid mutating the original array
    return [...dataset].sort((a, b) => {
        const { order, attribute } = sortBy;

        // Extract attribute values from objects
        const aValue = gatherValuesByPath(a as DynamicObject, attribute)[0];
        const bValue = gatherValuesByPath(b as DynamicObject, attribute)[0];

        // Compare values based on their types
        if (typeof aValue === "string" && typeof bValue === "string") {
            if (isDateString(aValue.split("T")[0]) && isDateString(bValue.split("T")[0])) {
                // Date comparison for non-string, non-numeric values
                
                const dateA = new Date(String(aValue));
                const dateB = new Date(String(bValue));
                return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
            }

            // Case-insensitive string comparison using localeCompare
            return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (!isNaN(parseFloat(String(aValue))) && !isNaN(parseFloat(String(bValue)))) {
            // Numeric comparison
            const numA = parseFloat(String(aValue));
            const numB = parseFloat(String(bValue));
            return order === "asc" ? numA - numB : numB - numA;
        } else {
            return 0;
        }
    });
};