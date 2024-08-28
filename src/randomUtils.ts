/**
 * Converts a given string into a hexadecimal color code with optional opacity and darkness adjustments.
 *
 * This function generates a deterministic color based on the input string. The color can be further 
 * modified by adjusting its opacity and darkness levels. The generated color code includes an alpha 
 * channel for opacity.
 *
 * @param str - The input string to be converted into a color. The same string will always generate the same color.
 * @param opacity - The opacity level of the color as a percentage (0 to 100). Defaults to 100% (fully opaque).
 * @param darkness - The darkness level of the color as a percentage (0 to 100). A higher percentage results in a darker color. Defaults to 0% (no darkening).
 * @returns A hexadecimal color code string in the format `#RRGGBBAA`, where `RR`, `GG`, and `BB` represent the red, green, and blue components, and `AA` represents the alpha (opacity).
 */
export const stringToColor = (str: string, opacity: number = 100, darkness: number = 0) => {
	let hash = 0;
	str.split("").forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash);
	});

	let colour = "#";
	for (let i = 0; i < 3; i++) {
		let value = (hash >> (i * 8)) & 0xff;
		
		// Apply darkness percentage
		value = Math.round(value * (1 - darkness / 100));
		
		colour += value.toString(16).padStart(2, "0");
	}

	// Ensure opacity is within the valid range and convert to hex
	const alpha = Math.round((opacity / 100) * 255);
	const alphaHex = alpha.toString(16).padStart(2, "0");

	return colour + alphaHex;
};


/**
 * Generates a UUID (v4).
 * 
 * @returns {string} - The generated UUID.
 */
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
