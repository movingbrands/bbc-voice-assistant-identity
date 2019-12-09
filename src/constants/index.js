import * as colors from "./colors";
import * as sizes from "./sizes";
import { parseColorPalette } from "Utils/parse";
import * as brandColors from "./brandColors";

export const parsedColors = parseColorPalette(colors);
export { sizes };
export * from "./presets";
export { colors };
export { brandColors };
