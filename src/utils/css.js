export const cycleColorBackgrounds = (name, _colors) => {
  const colors = [..._colors, _colors[0]];
  let result = `
    @keyframes ${name} {\n`;

  colors.forEach((col, i) => {
    const step = (i / (colors.length - 1)) * 100;
    const nextStep = ((i + 1) / (colors.length - 1)) * 100;

    result += `
        ${step}% {
            background-color: ${col};
        }\n
        `;
    if (i !== colors.length - 1) {
      result += `
        ${nextStep - 1}% {
            background-color: ${col};
        }\n            
        `;
    }
  });
  result += `
    }
    `;
  return result;
};
