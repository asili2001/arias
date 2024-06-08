import { checkDateInRange } from "../dateUtils";

const checkDateInRangeTests = [
    {
        //       |---------------| range
        // ||----------------------------------------------|| bounds
        description: "Range strictly within bounds, strict=false",
        value: ["2023-01-01", "2023-01-10"],
        rangeStart: "2022-12-31",
        rangeEnd: "2023-01-15",
        strict: false,
        expected: true
    },
    {
        //       |---------------| range
        // ||----------------------------------------------|| bounds
        description: "Range strictly within bounds, strict=true",
        value: ["2023-01-01", "2023-01-10"],
        rangeStart: "2022-12-31",
        rangeEnd: "2023-01-15",
        strict: true,
        expected: true
    },
    {
        //                                           |---------------| range
        // ||----------------------------------------------|| bounds
        description: "Partial overlap, strict=false",
        value: ["2024-01-01", "2026-01-01"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        strict: false,
        expected: true
    },
    {
        //                                           |---------------| range
        // ||----------------------------------------------|| bounds
        description: "Partial overlap, strict=true",
        value: ["2024-01-01", "2026-01-01"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        strict: true,
        expected: false
    },
    {
        // |------------------------------------------------------| range
        //    ||----------------------------------------------|| bounds
        description: "Range strictly within bounds, strict=false",
        value: ["2015-01-01", "2026-01-01"],
        rangeStart: "2020-01-01",
        rangeEnd: "2025-01-01",
        strict: false,
        expected: true
    },
    {
        // |------------------------------------------------------| range
        //    ||----------------------------------------------|| bounds
        description: "Range strictly within bounds, strict=true",
        value: ["2015-01-01", "2026-01-01"],
        rangeStart: "2020-01-01",
        rangeEnd: "2025-01-01",
        strict: true,
        expected: false
    },
    {
        // |--------| range
        //             ||----------------------------------------------|| bounds
        description: "Range outside bounds, strict=false",
        value: ["2010-01-01", "2019-01-01"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        strict: false,
        expected: false
    },
    {
        // |--------| range
        //             ||----------------------------------------------|| bounds
        description: "Range outside bounds, strict=true",
        value: ["2010-01-01", "2019-01-01"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        strict: false,
        expected: false
    },
    {
        //                | date
        // ||----------------------------------------------|| bounds
        description: "Single date within range",
        value: ["2024-01-01"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        expected: true
    },
    {
        //   | date
        //            ||----------------------------------------------|| bounds
        description: "Single date outside range",
        value: ["2010-01-01"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        expected: false
    },
    {
        description: "value empty array",
        value: [],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        expected: false,
        throws: "Invalid input: value must be an array with one or two date strings."
    },
    {
        description: "Invalid range dates",
        value: ["2010-01-01"],
        rangeStart: "Invalid",
        rangeEnd: "Invalid",
        expected: false,
        throws: "Invalid range dates."
    },
    {
        description: "Invalid selected dates",
        value: ["Invalid", "Invalid"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        expected: false,
        throws: "Invalid selected dates."
    },
    {
        description: "Invalid selected start date",
        value: ["Invalid"],
        rangeStart: "2023-01-01",
        rangeEnd: "2025-01-01",
        expected: false,
        throws: "Invalid selected date."
    },
];

describe("checkDateInRange", () => {
    checkDateInRangeTests.forEach(testScript => {
        const { description, value, rangeStart, rangeEnd, strict, expected, throws } = testScript;
        test(description, () => {
            if (throws) {
                expect(() => checkDateInRange(value as unknown as string[], rangeStart, rangeEnd, strict)).toThrow(throws);
            } else {
                const result = checkDateInRange(value as string[], rangeStart, rangeEnd, strict);
                expect(result).toBe(expected);
            }

        });
    });
});
