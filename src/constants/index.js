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
    }, small: {
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
        purple: "#B64AFF",
        green: "#00F0CC",
        orange: "#F54905",
        pink: "#EB498D",
        yellow: "#FED24D"
    },
    dark: {
        purple: "#480D6B",
        green: "#064751"
    },
    text: {
        white: "#FFFFFF",
        darkgrey: "#121212"
    }
};

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