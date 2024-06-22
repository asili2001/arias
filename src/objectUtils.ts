import { DeepArray, DynamicObject } from ".";

/**
 * Gathers values from a given object or array of objects based on a specified path.
 * 
 * @template T - Type of the object which extends DynamicObject.
 * @param {T | T[]} obj - The object or array of objects to gather values from.
 * @param {string} path - The path (dot-separated) to the desired property.
 * @param {boolean} [unique=true] - Whether to return only unique values.
 * @returns {unknown[]} - An array of values collected from the specified path.
 */
export const gatherValuesByPath = <T extends DynamicObject>(obj: T | T[], path: string, unique: boolean = true): unknown[] => {
    const keys = path.split(".");
    const result: unknown[] = [];

    function recursiveCollect(obj: DynamicObject | DynamicObject[], keys: string[]) {
        if (keys.length === 0) {
            result.push(obj);
            return;
        }

        const key = keys.shift() as string;
        if (Array.isArray(obj)) {
            // check if key is a number
            if (key.match(/^\d+$/)) {
                const index = parseInt(key, 10);
                if (index < obj.length) {
                    recursiveCollect(obj[index], keys);
                }
            } else {
                obj.forEach((item) => recursiveCollect(item[key], [...keys]));
            }
        } else if (obj[key]) {
            recursiveCollect(obj[key], keys);
        }
    }

    recursiveCollect(obj, keys);
    if (unique) {
        return [...new Set(result)];
    }

    return result;
};

/**
 * Filters an array of objects based on a specified path and set of values.
 * 
 * @template T - Type of the objects which extend DynamicObject.
 * @param {T[]} data - The array of objects to filter.
 * @param {string} path - The path (dot-separated) to the desired property.
 * @param {unknown[]} values - The values to filter by.
 * @returns {T[]} - An array of objects that match the specified values at the given path.
 */
export const filterObjectsByPath = <T extends DynamicObject>(data: DeepArray<T>, path: string, values: unknown[]): T[] => {
    return data.filter((obj: DeepArray<T>) => {
        const keys = path.split(".");
        let nestedValue: any = obj;
        for (const key of keys) {
            if (Array.isArray(nestedValue)) {
                const nestedArrayValues = nestedValue.map((item) => item[key]);

                // Remove undefined values from nestedArrayValues
                nestedValue = nestedArrayValues.filter(value => value !== undefined);
            } else {
                nestedValue = nestedValue[key];
            }
        }
        if (Array.isArray(nestedValue)) {
            return nestedValue.some((val) => values.includes(val));
        } else {
            return values.includes(nestedValue);
        }
    });
};

/**
 * Deeply clones an object or array.
 * 
 * @param {T} obj - The object or array to clone.
 * @returns {T} - The deeply cloned object or array.
 */
export const deepClone = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * Deeply merges two objects.
 * 
 * @param {T} target - The target object.
 * @param {T} source - The source object.
 * @returns {T} - The merged object.
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: T): T => {
    if (typeof target !== 'object' || target === null) {
        return source;
    }
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (isObject(target[key]) && isObject(source[key])) {
                target[key] = deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
};

/**
 * check if a value is an object.
 * 
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is an object, false otherwise.
 */
export const isObject = (value: unknown): value is Record<string, any> => {
    return value !== null && typeof value === 'object';
};
