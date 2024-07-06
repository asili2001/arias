import { deepClone, deepMerge, filterObjectsByPath, gatherValuesByPath, isObject } from "../objectUtils";

const gatherValuesByPathTests = [
    {
        description: "Single level path",
        obj: { name: "John" },
        path: "name",
        expected: ["John"]
    },
    {
        description: "Multi-level path",
        obj: { department: { manager: "John" } },
        path: "department.manager",
        expected: ["John"]
    },
    {
        description: "Multi-level path including array",
        obj: { department: { manager: [{ name: "John" }] } },
        path: "department.manager.name",
        expected: ["John"]
    },
    {
        description: "Multi-level path including specific object in child array",
        obj: { department: { manager: [{ name: "John" }, { name: "doe" }] } },
        path: "department.manager.0.name",
        expected: ["John"]
    },
    {
        description: "Multi-level path including specific object in array",
        obj: { department: { manager: [{ name: "John" }, { name: "Doe" }] } },
        path: "department.manager",
        expected: [{ name: "John" }, { name: "Doe" }]
    },
    {
        description: "Path not found",
        obj: { department: { manager: "John" } },
        path: "department.director",
        expected: []
    }
];

const filterObjectsByPathTests = [
    {
        description: "Filter objects by path",
        data: [
            { department: "IT" },
            { department: "HR" },
            { department: "Finance" }
        ],
        path: "department",
        values: ["HR", "Finance"],
        expected: [{ department: "HR" }, { department: "Finance" }]
    },
    {
        description: "Filter objects in arrays by path",
        data: [
            [{ department: "IT" }],
            [{ department: "HR" }],
            [{ department: "Finance" }],
        ],
        path: "department",
        values: ["HR", "Finance"],
        expected: [[{ department: "HR" }], [{ department: "Finance" }]]
    },
    {
        description: "Filter objects by path, no match",
        data: [
            { department: "IT" },
            { department: "HR" },
            { department: "Finance" }
        ],
        path: "department",
        values: ["Marketing"],
        expected: []
    }
];

const deepCloneTests = [
    {
        description: "Deep clone",
        obj: { name: "John", department: { manager: "Jane" } },
        expected: { name: "John", department: { manager: "Jane" } }
    },
    {
        description: "Deep clone with array",
        obj: { name: "John", department: { manager: ["Jane"] } },
        expected: { name: "John", department: { manager: ["Jane"] } }
    },
    {
        description: "Deep clone with array of objects",
        obj: { name: "John", department: { manager: [{ name: "Jane" }] } },
        expected: { name: "John", department: { manager: [{ name: "Jane" }] } }
    }
];

const deepMergeTests = [
    {
        description: "Deep merge",
        target: { name: "John", department: { manager: "Jane" } },
        source: { department: { manager: "Joe" } },
        expected: { name: "John", department: { manager: "Joe" } }
    },
    {
        description: "Deep merge with array",
        target: { name: "John", department: { manager: ["Jane"] } },
        source: { department: { manager: ["Joe"] } },
        expected: { name: "John", department: { manager: ["Joe"] } }
    },
    {
        description: "Deep merge, target is null",
        target: null,
        source: { department: { manager: ["Joe"] } },
        expected: { department: { manager: ["Joe"] } }
    },
    {
        description: "Deep merge with array of objects",
        target: { name: "John", department: { manager: [{ name: "Jane" }] } },
        source: { department: { manager: [{ name: "Joe" }] } },
        expected: { name: "John", department: { manager: [{ name: "Joe" }] } }
    }
];

const isObjectTests = [
    {
        description: "Value is an object",
        value: { name: "John" },
        expected: true
    },
    {
        description: "Value is an array",
        value: ["John"],
        expected: true
    },
    {
        description: "Value is a string",
        value: "John",
        expected: false
    },
    {
        description: "Value is a number",
        value: 1,
        expected: false
    },
    {
        description: "Value is null",
        value: null,
        expected: false
    }
];


describe("gatherValuesByPath", () => {
    gatherValuesByPathTests.forEach(testScript => {
        const { description, obj, path, expected } = testScript;
        test(description, () => {
            const result = gatherValuesByPath(obj, path);
            expect(result).toMatchObject(expected);
        });
    });
});

describe("filterObjectsByPath", () => {
    filterObjectsByPathTests.forEach(testScript => {
        const { description, data, path, values, expected } = testScript;
        test(description, () => {
            const result = filterObjectsByPath(data, path, values);
            expect(result).toEqual(expected);
        });
    });
});

describe("deepClone", () => {
    deepCloneTests.forEach(testScript => {
        const { description, obj, expected } = testScript;
        test(description, () => {
            const result = deepClone(obj);
            expect(result).toEqual(expected);
        });
    });
});

describe("deepMerge", () => {
    deepMergeTests.forEach(testScript => {
        const { description, target, source, expected } = testScript;
        test(description, () => {
            const result = deepMerge(target as object, source);
            expect(result).toEqual(expected);
        });
    });
});

describe("isObject", () => {
    isObjectTests.forEach(testScript => {
        const { description, value, expected } = testScript;
        test(description, () => {
            const result = isObject(value);
            expect(result).toBe(expected);
        });
    });
});
