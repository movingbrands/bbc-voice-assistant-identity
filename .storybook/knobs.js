import { select, number, boolean } from "@storybook/addon-knobs";

import { colors, parsedColors } from "Constants";

const parseColorsToProps = () => {
  const result = [];
  Object.keys(colors).forEach(p => {
    Object.keys(colors[p]).forEach(k => result.push(`${p}.${k}`));
  });
  return result;
};
const colorsForKnob = parseColorsToProps();

export const paletteKnob = (title, defaultValue) =>
  select(title, colorsForKnob, defaultValue);

export const pixelRatioKnob = (defaultValue = 2.0, title = "Pixel ratio") =>
  number(title, defaultValue, {
    range: true,
    min: 1,
    max: 3,
    step: 0.5
  });

export const numController = (title, defaultValue = 0.0, step = 0.01) =>
  number(title, defaultValue, {
    range: true,
    min: 0,
    max: 1,
    step
  });

export const speedController = (title, defaultValue = 0.0, step = 0.001) =>
  number(title, defaultValue, {
    range: true,
    min: 0,
    max: 0.1,
    step
  });

export const animatedKnob = (defaultValue = false, title = "Animated") =>
  boolean(title, defaultValue);

export const sizeKnob = (width = 200, height) => {
  return [
    number("Width (px)", width, { min: 100, max: 2048 }),
    number("Height (px)", height || width, { min: 100, max: 2048 })
  ];
};

const densityOptions = {
  range: true,
  min: 10,
  max: 120,
  step: 10
};

export const densityKnob = (defaultValue, title = "Density") =>
  number(title, defaultValue, densityOptions);
