import { chunkArray, genericFilter, sortDataset } from "../arrayUtils";
import { Filter } from "../.";
import { SortBy } from "../types/Sort";

const genericFilterNumberRangeTests = [
    {
        description: "Filter objects by range",
        data: [
            { age: 50 },
            { age: 0 },
            { age: 80 },
            { age: 45 }
        ],
        filters: [
            {
                path: ["age"],
                type: "numberRange",
                value: [0, 50]
            }
        ],
        expected: [
            { age: 50 },
            { age: 0 },
            { age: 45 },
        ]
    },
    {
        description: "Filter objects by range. sum all values in array of objects",
        data: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 }
                ]
            },
            {
                age: 30,
                grades: [
                    { grade: 10 },
                    { grade: 50 },
                    { grade: 30 }
                ]
            },
            {
                age: 45,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 100 }
                ]
            }
        ],
        filters: [
            {
                path: ["grades.grade"],
                operation: "+",
                type: "numberRange",
                value: [30, 60]
            }
        ],
        expected: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 }
                ]
            }
        ]
    },
    {
        description: "Filter objects by range. multiply all values in array of objects",
        data: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 } //6000
                ]
            },
            {
                age: 30,
                grades: [
                    { grade: 10 },
                    { grade: 50 },
                    { grade: 30 } //15000
                ]
            },
            {
                age: 45,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 100 } //20000
                ]
            }
        ],
        filters: [
            {
                path: ["grades.grade"],
                operation: "*",
                type: "numberRange",
                value: [5000, 10000]
            }
        ],
        expected: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 }
                ]
            }
        ]
    },
    {
        description: "Filter objects by range. devide all values in array of objects",
        data: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 } //0.016
                ]
            },
            {
                age: 30,
                grades: [
                    { grade: 10 },
                    { grade: 50 },
                    { grade: 30 } //0,006
                ]
            },
            {
                age: 45,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 100 } // 0.005
                ]
            }
        ],
        filters: [
            {
                path: ["grades.grade"],
                operation: "/",
                type: "numberRange",
                value: [0.01, 1]
            }
        ],
        expected: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 }
                ]
            }
        ]
    },
    {
        description: "Filter objects by range. subtract all values in array of objects",
        data: [
            {
                age: 50,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 30 } //-40
                ]
            },
            {
                age: 30,
                grades: [
                    { grade: 10 },
                    { grade: 50 },
                    { grade: 30 } //-70
                ]
            },
            {
                age: 45,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 100 } //-110
                ]
            }
        ],
        filters: [
            {
                path: ["grades.grade"],
                operation: "-",
                type: "numberRange",
                value: [-200, -75]
            }
        ],
        expected: [
            {
                age: 45,
                grades: [
                    { grade: 10 },
                    { grade: 20 },
                    { grade: 100 }
                ]
            }
        ]
    },
    {
        description: "Filter objects by range, no match",
        data: [
            { age: 50 },
            { age: 30 },
            { age: 48 },
            { age: 45 }
        ],
        filters: [
            {
                path: ["age"],
                type: "numberRange",
                value: [100, 200]
            }
        ],
        expected: []
    },
    {
        description: "Filter objects by range, undefined",
        data: [
            { age: 50 },
            { age: 30 },
            { age: 48 },
            { age: 45 }
        ],
        filters: [
            {
                path: ["unefinedValue"],
                type: "numberRange",
                value: [100, 200]
            }
        ],
        expected: []
    }
];

const genericFilterSingleSelectTests = [
    {
        description: "Filter objects by single select",
        data: [
            { department: "IT" },
            { department: "HR" },
            { department: "Finance" }
        ],
        filters: [
            {
                path: ["department"],
                type: "singleSelect",
                value: "HR"
            }
        ],
        expected: [
            { department: "HR" }
        ]
    },
    {
        description: "Filter objects by single select, no match",
        data: [
            { department: "IT" },
            { department: "HR" },
            { department: "Finance" }
        ],
        filters: [
            {
                path: ["department"],
                type: "singleSelect",
                value: "Marketing"
            }
        ],
        expected: []
    }
];

const genericFilterMultiSelectTests = [
    {
        description: "Filter objects by multi select",
        data: [
            {
                department: "IT",
                device: {
                    type: "laptop"
                }
            },
            {
                department: "HR",
                device: {
                    type: "desktop"
                }
            },
            {
                department: "Finance",
                device: {
                    type: "unknown"
                }
            }
        ],
        filters: [
            {
                path: ["department"],
                type: "multiSelect",
                value: ["HR", "Finance"]
            },
            {
                path: ["device.type"],
                type: "multiSelect",
                value: ["desktop", "laptop"]
            }
        ],
        expected: [
            {
                department: "HR",
                device: {
                    type: "desktop"
                }
            }
        ]
    },
    {
        description: "Filter objects by multi select, no match",
        data: [
            { department: "IT" },
            { department: "HR" },
            { department: "Finance" }
        ],
        filters: [
            {
                path: ["department"],
                type: "multiSelect",
                value: ["Marketing"]
            }
        ],
        expected: []
    }
];

const genericFilterDateRangeInRangeTests = [
    {
        description: "Filter objects by date range in range",
        data: [
            { startDate: "2020-01-01", endDate: "2023-01-01" },
            { startDate: "2019-01-01", endDate: "2022-01-01" },
            { startDate: "2021-01-01", endDate: "2024-01-01" }
        ],
        filters: [
            {
                path: ["startDate", "endDate"],
                type: "dateRangeInRange",
                value: ["2020-01-01", "2023-01-01"]
            }
        ],
        expected: [
            { startDate: "2020-01-01", endDate: "2023-01-01" },
        ]
    },
    {
        description: "Filter objects by date range in range, no match",
        data: [
            { startDate: "2020-01-01", endDate: "2023-01-01" },
            { startDate: "2019-01-01", endDate: "2022-01-01" },
            { startDate: "2021-01-01", endDate: "2024-01-01" }
        ],
        filters: [
            {
                path: ["startDate", "endDate"],
                type: "dateRangeInRange",
                value: ["2025-01-01", "2026-01-01"]
            }
        ],
        expected: []
    },
    {
        description: "Filter objects by date range in range, unstrict",
        data: [
            { startDate: "2020-01-01", endDate: "2023-01-01" },
            { startDate: "2019-01-01", endDate: "2022-01-01" },
            { startDate: "2021-01-01", endDate: "2024-01-01" }
        ],
        filters: [
            {
                path: ["startDate", "endDate"],
                type: "dateRangeInRange",
                value: ["2021-01-01", "2026-01-01"],
                strict: false
            }
        ],
        expected: [
            { startDate: "2020-01-01", endDate: "2023-01-01" },
            { startDate: "2019-01-01", endDate: "2022-01-01" },
            { startDate: "2021-01-01", endDate: "2024-01-01" }
        ]
    },
    {
        description: "Invalid date path",
        data: [
            { startDate: "2020-01-01", endDate: "2023-01-01" },
        ],
        filters: [
            {
                path: ["startDate.invalid", "endDate.invalid"],
                type: "dateRangeInRange",
                value: ["2025-01-01", "2026-01-01"]
            }
        ],
        expected: [],
        consoleError: "Invalid date format: undefined, undefined"
    }
];

const genericFilterDateInRangeTests = [
    {
        description: "Filter objects by date in range",
        data: [
            { startDate: "2020-01-01" },
            { startDate: "2019-01-01" },
            { startDate: "2021-01-01" }
        ],
        filters: [
            {
                path: ["startDate"],
                type: "dateInRange",
                value: ["2020-01-01", "2023-01-01"]
            }
        ],
        expected: [
            { startDate: "2020-01-01" },
            { startDate: "2021-01-01" }
        ]
    },
    {
        description: "Filter objects by date in range, no match",
        data: [
            { startDate: "2020-01-01" },
            { startDate: "2019-01-01" },
            { startDate: "2021-01-01" }
        ],
        filters: [
            {
                path: ["startDate"],
                type: "dateInRange",
                value: ["2025-01-01", "2026-01-01"]
            }
        ],
        expected: []
    },
    {
        description: "Invalid date path",
        data: [
            { startDate: "2020-01-01" },
            { startDate: "2019-01-01" },
            { startDate: "2021-01-01" }
        ],
        filters: [
            {
                path: ["startDate.invalid"],
                type: "dateInRange",
                value: ["2025-01-01", "2026-01-01"]
            }
        ],
        expected: [],
        consoleError: "Invalid date format: undefined"
    },
    {
        description: "Invalid filter type",
        data: [
            { startDate: "2020-01-01" },
            { startDate: "2019-01-01" },
            { startDate: "2021-01-01" }
        ],
        filters: [
            {
                path: ["startDate"],
                type: "invalid",
                value: ["2025-01-01", "2026-01-01"]
            }
        ],
        expected: [
            { startDate: "2020-01-01" },
            { startDate: "2019-01-01" },
            { startDate: "2021-01-01" }
        ]
    }
];

const chunkArrayTests = [
    {
        description: "Chunk array into 3",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        size: 3,
        expected: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    },
    {
        description: "Chunk array into 2",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        size: 2,
        expected: [[1, 2], [3, 4], [5, 6], [7, 8], [9]]
    }
];

const sortDatasetInitData = [{ name: "Alice", age: 30, birth: new Date("2020-01-01") },{ name: "Bob", age: 25, birth: new Date("2021-01-01") },{ name: "Charlie", age: 35, birth: new Date("2010-01-01")}]
const sortDatasetTests = [
    {
        description: "sort number in ascending order",
        data: sortDatasetInitData,
        sortBy: {order: "asc", attribute: "age"},
        expected: [sortDatasetInitData[1],sortDatasetInitData[0],sortDatasetInitData[2]]
    },
    {
        description: "sort number in desc order",
        data: sortDatasetInitData,
        sortBy: {order: "desc", attribute: "age"},
        expected: [sortDatasetInitData[2], sortDatasetInitData[0], sortDatasetInitData[1]]
    },
    {
        description: "sort string in asc order",
        data: sortDatasetInitData,
        sortBy: {order: "asc", attribute: "name"},
        expected: [sortDatasetInitData[0], sortDatasetInitData[1], sortDatasetInitData[2]]
    },
    {
        description: "sort string in descending order",
        data: sortDatasetInitData,
        sortBy: {order: "desc", attribute: "name"},
        expected: [sortDatasetInitData[2], sortDatasetInitData[1], sortDatasetInitData[0]]
    },
    {
        description: "sort date in asc order",
        data: sortDatasetInitData,
        sortBy: {order: "asc", attribute: "birth"},
        expected: [sortDatasetInitData[2], sortDatasetInitData[0], sortDatasetInitData[1]]
    },
    {
        description: "sort date in desc order",
        data: sortDatasetInitData,
        sortBy: {order: "desc", attribute: "birth"},
        expected: [sortDatasetInitData[1], sortDatasetInitData[0], sortDatasetInitData[2]]
    },
    {
        description: "sort undefined in asc order",
        data: sortDatasetInitData,
        sortBy: {order: "asc", attribute: "undefinedVal"},
        expected: [...sortDatasetInitData]
    },
    {
        description: "sort date in desc order",
        data: sortDatasetInitData,
        sortBy: {order: "desc", attribute: "undefinedVal"},
        expected: [...sortDatasetInitData]
    },
];

describe("genericFilter", () => {
    genericFilterNumberRangeTests.forEach(testScript => {
        const { description, data, filters, expected } = testScript;
        test(description, () => {
            const result = genericFilter(data, filters as Filter[]);
            expect(result).toEqual(expected);
        });
    });

    genericFilterSingleSelectTests.forEach(testScript => {
        const { description, data, filters, expected } = testScript;
        test(description, () => {
            const result = genericFilter(data, filters as Filter[]);
            expect(result).toEqual(expected);
        });
    });

    genericFilterMultiSelectTests.forEach(testScript => {
        const { description, data, filters, expected } = testScript;
        test(description, () => {
            const result = genericFilter(data, filters as Filter[]);
            expect(result).toEqual(expected);
        });
    });

    genericFilterDateRangeInRangeTests.forEach(testScript => {
        const { description, data, filters, expected, consoleError } = testScript;
        test(description, () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const result = genericFilter(data, filters as Filter[]);
            expect(result).toEqual(expected);

            if (consoleError) {
                expect(consoleErrorSpy).toHaveBeenCalledWith(consoleError);
            }
        });
    });

    genericFilterDateInRangeTests.forEach(testScript => {
        const { description, data, filters, expected, consoleError } = testScript;
        test(description, () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const result = genericFilter(data, filters as Filter[]);
            expect(result).toEqual(expected);

            if (consoleError) {
                expect(consoleErrorSpy).toHaveBeenCalledWith(consoleError);
            }
        });

    });
});

describe("chunkArray", () => {
    chunkArrayTests.forEach(testScript => {
        const { description, data, size, expected } = testScript;
        test(description, () => {
            const result = chunkArray(data, size);
            expect(result).toEqual(expected);

        });

        expect(() => chunkArray([1, 2, 3], -1)).toThrow('Size must be a positive number');
    });
    //  
});

describe("sortDataset", () => {
    sortDatasetTests.forEach(testScript => {
        const {description, data, sortBy, expected} = testScript;
        test(description, () => {
            const result = sortDataset(data, sortBy as SortBy);
            expect(result).toEqual(expected);
        })
    })
})
