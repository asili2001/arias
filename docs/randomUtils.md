## `stringToColor`

The `stringToColor` function generates a color code from a given string. This can be useful for visually representing different strings with distinct colors.

### Attributes

* **str**: The input string from which to generate the color.

### Returns

* A hexadecimal color code string.

### Example

#### Generating Color Code from String

````typescript
const color = stringToColor("hello");
// color: "#d218e95a"
````

In this example, the string "hello" is converted into a color code.

## `generateUUID`

The `generateUUID` function generates a version 4 UUID (Universally Unique Identifier).

### Returns

* A string representing a UUID.

### Example

#### Generating a UUID

````typescript
const uuid = generateUUID();
// Example output: "550e8400-e29b-41d4-a716-446655440000"
````

In this example, a version 4 UUID is generated.

### Notes

* This function follows the UUID version 4 format.
* The generated UUID is pseudo-random.
