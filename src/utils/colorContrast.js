import { Color } from "Utils/Color";

export const luminosityContrastRatio = (lumaA, lumaB) => {
  let lighter, darker;

  if (lumaA >= lumaB) {
    lighter = lumaA;
    darker = lumaB;
  } else {
    lighter = lumaB;
    darker = lumaA;
  }

  return (lighter + 0.05) / (darker + 0.05)
};

export const compare = (backgroundColor, color, ratios) => {
  if (backgroundColor instanceof Color && color instanceof Color) {
    const result = luminosityContrastRatio(color.luma, backgroundColor.luma);
    return {
      result: result.toFixed(2),
      tests: Object.keys(ratios).map(k => {
        const { rating, size, ratio } = ratios[k];
        return { rating, size, pass: result > ratio };
      })
    };
  } else {
    throw new Error("Please supply a valid Color object");
  }
};
