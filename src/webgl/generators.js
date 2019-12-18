import { mapRange } from "Utils/number";
import { uniform } from "Utils/Uniform";
import { Color } from "Utils/Color";

const generateGridPosition = (rows, columns, ratio, index) => {
  const col = parseInt(index / columns, 10);
  const row = index - col * columns;

  return [
    mapRange(row, 0, columns - 1, -ratio[0], ratio[0]),
    mapRange(col, 0, rows - 1, -ratio[1], ratio[1])
  ];
};

export const generateBackgroundGeometry = (z = -5) => {
  return {
    vertices: [
      { x: -100.0, y: 100.0, z },
      { x: -100.0, y: -100.0, z },
      { x: 100.0, y: 100.0, z },
      { x: 100.0, y: -100.0, z },
      { x: -100.0, y: -100.0, z },
      { x: 100.0, y: 100.0, z }
    ]
  };
};

export const generateAttributes = (rows, columns, ratio) => [
  {
    name: "aGridPosition",
    data: index => generateGridPosition(rows, columns, ratio, index),
    size: 2
  }
];

export const generateBackgroundUniforms = background => [
  {
    uBackgroundColor: uniform(new Color(background), { transition: true })
  }
];

export const generateUniforms = (
  width,
  height,
  foregroundColor,
  size,
  movement
) => {
  const uniforms = {
    uTime: uniform(0.0),
    uSpeed: uniform(0.1),
    uSize: uniform(size, { transition: true }),
    uHotspot: uniform([0, 0.6], { transition: true }),
    uWave: uniform(0.9, { transition: true }),
    uPulse: uniform(0.0, { transition: true }),
    uResolution: uniform([width, height]),
    uMovement: uniform(movement, { transition: true }),
    uForegroundColor: uniform(foregroundColor, { transition: true })
  };
  console.log(uniforms);
  return [
    uniforms,
    Object.keys(uniforms).filter(u => !!uniforms[u].updateValue)
  ];
};

export const generateRatio = (width, height, amp = 1.5) => [
  (width > height ? width / height : 1.0) * amp,
  (height > width ? height / width : 1.0) * amp
];
