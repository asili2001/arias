## `gatherValuesByPath` Utility Function

The `gatherValuesByPath` function collects values from a given object or array of objects based on a specified path. This is useful for retrieving nested properties from complex data structures.

### Attributes

* **obj**: The object or array of objects to gather values from. This parameter can be a single object or an array of objects that extend the `DynamicObject` type.
* **path**: The path (dot-separated) to the desired property. This string specifies the nested keys to traverse in order to retrieve the desired values.
* **unique**: (Optional) A boolean indicating whether to return only unique values. Defaults to `true`.

### Returns

* An array of values collected from the specified path. If the `unique` parameter is `true`, the array will contain only unique values.

### Example

#### Collecting Values from an Object

````typescript
const data = {
    users: [
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 30 }
    ]
};

const ages = gatherValuesByPath(data, 'users.age');
// ages: [30, 25]

const nonUniqueAges = gatherValuesByPath(data, 'users.age', false);
// nonUniqueAges: [30, 25, 30]
````

In this example, the function retrieves the `age` property from each object in the `users` array. The `unique` parameter determines whether duplicate ages are removed.

### Notes

* The function uses recursion to traverse nested objects and arrays based on the specified path.
* If the path includes array indices, the function can correctly handle those as well.
* The function returns an empty array if the specified path does not exist in the object.

## `filterObjectsByPath`

The `filterObjectsByPath` function filters an array of objects based on a specified path and a set of values. This is useful for retrieving objects that match specific criteria from complex data structures.

### Attributes

* **data**: The array of objects to filter. Each object should extend the `DynamicObject` type.
* **path**: The path (dot-separated) to the desired property. This string specifies the nested keys to traverse in order to access the property to filter by.
* **values**: The values to filter by. This is an array of values that the specified property should match.

### Returns

* An array of objects that match the specified values at the given path. Only objects that have properties matching one of the specified values will be included in the result.

### Example

#### Filtering Objects by a Nested Property

````typescript
const data = [
    { id: 1, details: { name: 'Alice', age: 30 } },
    { id: 2, details: { name: 'Bob', age: 25 } },
    { id: 3, details: { name: 'Charlie', age: 30 } }
];

const filteredData = filterObjectsByPath(data, 'details.age', [30]);
// filteredData: [
//     { id: 1, details: { name: 'Alice', age: 30 } },
//     { id: 3, details: { name: 'Charlie', age: 30 } }
// ]
````

In this example, the function filters the `data` array to include only objects where the `details.age` property is `30`

### Notes

* The function uses a dot-separated string to specify the path to the property to filter by. This allows for deep access within nested objects.
* The function correctly handles arrays within the path and can filter based on values within nested arrays.
* If the specified path does not exist in an object, that object will not be included in the result.

## `deepClone`

The `deepClone` function creates a deep copy of an object or array. This means that all nested objects and arrays are also recursively copied, ensuring that the original and the clone are completely independent of each other.

### Attributes

* **obj**: The object or array to clone. This can be any valid JavaScript object or array that you want to duplicate.

### Returns

* The deeply cloned object or array. This new object or array will be a complete copy of the original, with no references to the original object's or array's properties or elements.

### Example

#### Deep Cloning an Object

`````typescript
const original = {
    name: 'Alice',
    details: {
        age: 30,
        address: {
            city: 'Wonderland'
        }
    }
};

const clone = deepClone(original);

clone.details.age = 31;
console.log(original.details.age); // 30, original is not affected by changes to the clone
`````

In this example, the `deepClone` function creates a new object that is a deep copy of the `original`. Changes to the `clone` do not affect the `original` object.

#### Deep Cloning an Array

````typescript
const originalArray = [1, [2, 3], { a: 4, b: 5 }];

const cloneArray = deepClone(originalArray);

cloneArray[1][0] = 10;
console.log(originalArray[1][0]); // 2, original array is not affected by changes to the clone
````

In this example, the `deepClone` function creates a new array that is a deep copy of the `originalArray`. Changes to the `cloneArray` do not affect the `originalArray`.

### Notes

* The function uses `JSON.parse(JSON.stringify(obj))` to create the deep copy. This method is simple and effective for cloning objects and arrays that do not contain functions, `undefined`, `NaN`, `Infinity`, or other non-serializable values.
* For more complex cloning requirements (e.g., objects with methods or special data types), other deep cloning techniques may be necessary.

## `deepMerge`

The `deepMerge` function deeply merges two objects. This means that nested objects are recursively merged, combining the properties of both the target and source objects.

### Attributes

* **target**: The target object. This is the object that will be merged with the properties of the source object.
* **source**: The source object. This object provides the properties that will be merged into the target object.

### Returns

* The merged object. The function returns the target object with properties from the source object deeply merged into it.

### Example

#### Deep Merging Objects

````typescript
const target = {
    user: {
        name: 'Alice',
        details: {
            age: 30,
            address: {
                city: 'Wonderland'
            }
        }
    }
};

const source = {
    user: {
        details: {
            address: {
                zip: '12345'
            }
        }
    }
};

const merged = deepMerge(target, source);
// merged: {
//     user: {
//         name: 'Alice',
//         details: {
//             age: 30,
//             address: {
//                 city: 'Wonderland',
//                 zip: '12345'
//             }
//         }
//     }
// }
````

In this example, the `deepMerge` function merges the `source` object into the `target` object, combining their nested properties.

### Notes

* The function checks if the properties of both the target and source objects are objects themselves, and if so, it recursively merges them.
* If a property in the source object is not an object or does not exist in the target object, it simply assigns the source property to the target.
* The function does not merge arrays. If the source object contains an array, it will overwrite the target array.

## `isObject` 

The `isObject` function checks if a given value is an object. This is useful for determining whether a value should be treated as an object in operations such as merging or cloning.

### Attributes

* **value**: The value to check. This can be any JavaScript value.

### Returns

* **boolean**: `True` if the value is an object; `False` otherwise.

### Example

#### Checking if a Value is an Object

````typescript
console.log(isObject({})); // true
console.log(isObject([])); // true
console.log(isObject(null)); // false
console.log(isObject(42)); // false
console.log(isObject("string")); // false
````

In this example, the `isObject` function correctly identifies objects, arrays, and non-object values.

### Notes

* The function returns `true` for plain objects and arrays since both are considered objects in JavaScript.
* The function returns `false` for `null`, even though `typeof null` is `'object'`, because `null` is not considered an actual object for practical purposes.
* This function can be used in conjunction with other utility functions that require object type checking, such as deep merging or cloning functions.
