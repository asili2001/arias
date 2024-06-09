## `checkDateInRange`

The `checkDateInRange` function checks if a given date or a date range falls within a specified date range. This can be useful for validating dates against a predefined range, such as checking event dates or filtering data by date.

### Purpose

The purpose of `checkDateInRange` is to determine whether one or two dates fall within a specified start and end date range. It supports both inclusive and strict comparisons.

### Function Signature

````typescript
/**
 * Checks if a given date or date range falls within a specified range.
 * 
 * @param {string[]} value - An array containing one or two date strings.
 * @param {string} rangeStart - The start date of the range.
 * @param {string} rangeEnd - The end date of the range.
 * @param {boolean} [strict=false] - If true, the date range must be strictly within the specified range.
 * @returns {boolean} - True if the date(s) fall within the range, false otherwise.
 * @throws {Error} - Throws an error if the input dates or range dates are invalid.
 */
export const checkDateInRange = (value: string[], rangeStart: string, rangeEnd: string, strict: boolean = false): boolean => {...}
````

### Examples

#### Checking a Single Date

````typescript
const date = ["2023-06-15"];
const rangeStart = "2023-06-01";
const rangeEnd = "2023-06-30";

const isInRange = checkDateInRange(date, rangeStart, rangeEnd);
// isInRange: true
````

In this example, the date `"2023-06-15"` falls within the range from `"2023-06-01"` to `"2023-06-30"`.

#### Checking a Date Range

````typescript
const dateRange = ["2023-06-10", "2023-06-20"];
const rangeStart = "2023-06-01";
const rangeEnd = "2023-06-30";

const isInRange = checkDateInRange(dateRange, rangeStart, rangeEnd);
// isInRange: true
````

In this example, the date range from `"2023-06-10"` to `"2023-06-20"` falls within the range from `"2023-06-01"` to `"2023-06-30"`.

#### Checking a Date Range with Strict Mode

````typescript
const dateRange = ["2023-06-10", "2023-06-20"];
const rangeStart = "2023-06-01";
const rangeEnd = "2023-06-30";

const isInRangeStrict = checkDateInRange(dateRange, rangeStart, rangeEnd, true);
// isInRangeStrict: true
````

In this example, the date range from `"2023-06-10"` to `"2023-06-20"` strictly falls within the range from `"2023-06-01"` to `"2023-06-30"`.

### Notes

* The function validates the date strings and throws an error if any date is invalid.
* The `strict` parameter determines whether the date range must be completely within the specified range (`true`) or can overlap (`false`).


## `isDateString`

The `isDateString` function checks if a given string is in the `yyyy-mm-dd` date format. This is useful for validating date inputs to ensure they conform to the expected format.

### Purpose

The purpose of `isDateString` is to validate whether a given string matches the `yyyy-mm-dd` date format, which is commonly used in many applications for date representation.

### Example

#### Validating Date Strings

````typescript
const validDate = "2023-06-15";
const invalidDate = "15-06-2023";

const isValid = isDateString(validDate);
// isValid: true

const isInvalid = isDateString(invalidDate);
// isInvalid: false
````
