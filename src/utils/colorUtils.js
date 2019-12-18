import { Color } from "Utils/Color";
import { createMemo } from "Utils/createMemo";
import { voicePresets, brandPresets } from "Constants";

// simple utility to choose from an object of values based on a key
// alternative fallback: options[Object.keys(options)[0]]
const choose = (val, theme, options) =>
  options[val][theme] ||
  new Error(`Invalid preset: ${val} and theme: ${theme}`);

// this helper takes the color input props from <Net/> and returns
// foreground and background color values for the renderer
export const generatePalette = (
  foreground,
  background,
  theme,
  voice,
  brand
) => {
  const [bg, fg] = brand
    ? choose(brand, theme, brandPresets)
    : choose(voice, theme, voicePresets);

  // if the foreground/background colors are specifically overridden,
  // supply those, otherwise calculate color values based on state
  return [new Color(background || bg), new Color(foreground || fg)];
};

export const generatePaletteMemo = createMemo(generatePalette);
