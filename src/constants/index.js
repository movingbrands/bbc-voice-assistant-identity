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
}

export const brandColors = {
    Sounds: "#f54800",
    iPlayer: "#ed4a8f",
    Sport: "#ffd11f",
    Weather: "#0e80b3"
}

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
    text: {
        white: "#FFFFFF",
        darkgrey: "#121212"
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
}

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