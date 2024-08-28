## `stringToColor`
### Converts a given string into a hexadecimal color code with optional opacity and darkness adjustments.
This function generates a deterministic color based on the input string. The color can be further modified by adjusting its opacity and darkness levels. The generated color code includes an alpha channel for opacity.

### Attributes

* **str**: The input string to be converted into a color. The same string will always generate the same color.
* **opacity**: The opacity level of the color as a percentage (0 to 100). Defaults to 100% (fully opaque).
* **darkness**: The darkness level of the color as a percentage (0 to 100). A higher percentage results in a darker color. Defaults to 0% (no darkening).

### Returns

* A hexadecimal color code string in the format `#RRGGBBAA`, where `RR`, `GG`, and `BB` represent the red, green, and blue components, and `AA` represents the alpha (opacity).

### Example

#### Generating Color Code from String

````typescript
const color = stringToColor("hello");
// color: "#d218e9ff"
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
