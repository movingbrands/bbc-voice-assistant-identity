import { colors, brandColors } from "Constants";

// presets are specified in pairs as [background, foreground] colors
export const brandPresets = {
  iPlayer: {
    dark: [colors.dark.purple, brandColors.iPlayer],
    light: [brandColors.iPlayer, colors.light.yellow]
  },
  Sounds: {
    dark: [colors.dark.purple, brandColors.Sounds],
    light: [brandColors.Sounds, colors.light.yellow]
  },
  Sport: {
    dark: [colors.dark.green, brandColors.Sport],
    light: [colors.light.purple, brandColors.Sport]
  },
  Weather: {
    dark: [colors.dark.green, brandColors.Weather],
    light: [colors.light.green, brandColors.Weather]
  }
};

export const voicePresets = {
  beeb: {
    dark: [colors.dark.purple, colors.light.purple],
    light: [colors.light.green, colors.light.purple]
  },
  user: {
    dark: [colors.dark.purple, colors.light.green],
    light: [colors.light.green, colors.dark.purple]
  }
};
