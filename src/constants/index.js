export const sizes = {
  large: {
    name: "Large",
    width: 1008,
    height: 718
  },
  medium: {
    name: "Medium",
    width: 640,
    height: 571
  },
  small: {
    name: "Small",
    width: 320,
    height: 516
  }
};

export const colors = {
  light: {
    purple: "#b849ff",
    green: "#00efca",
    orange: "#fd4b1f",
    pink: "#f34b96",
    yellow: "#ffd24d"
  },
  dark: {
    purple: "#490c6e",
    green: "#034752"
  },
  neutral: {
    darkgrey: "#121212",
    grey6: "#8A9492",
    grey5: "#97A6A3",
    grey4: "#A5B7B4",
    grey3: "#C1DAD5",
    grey2: "#D8E5E2",
    grey1: "#EFEFEF",
    white: "#FFFFFF"
  },
  brands: {
    Sounds: "#f54800",
    iPlayer: "#ed4a8f",
    Sport: "#ffd11f",
    Weather: "#0e80b3",
    News: "#ba1b20"
  }
};

export const printColors = {
  dark: {
    green: {
      pantone: "7477 C",
      cmyk: [86, 29, 21, 67]
    },
    purple: {
      pantone: "268 C",
      cmyk: [82, 98, 0, 12]
    }
  },
  light: {
    green: {
      pantone: "929 C",
      cmyk: [48, 0, 25, 0]
    },
    purple: {
      pantone: "814 C",
      cmyk: [52, 66, 0, 0]
    }
  }
};

export const brandPresets = {
  iPlayer: {
    dark: [colors.dark.purple, colors.brands.iPlayer],
    light: [colors.brands.iPlayer, colors.light.yellow]
  },
  Sounds: {
    dark: [colors.dark.purple, colors.brands.Sounds],
    light: [colors.brands.Sounds, colors.light.yellow]
  },
  Sport: {
    dark: [colors.dark.green, colors.brands.Sport],
    light: [colors.light.purple, colors.brands.Sport]
  },
  Weather: {
    dark: [colors.dark.green, colors.brands.Weather],
    light: [colors.light.green, colors.brands.Weather]
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
