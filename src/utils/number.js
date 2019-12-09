export const randomInteger = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1) + minimum);

export const randomPosition = extent => [
  randomInteger(-extent, extent),
  randomInteger(-extent, extent)
];

export const randomFromArray = arr =>
  arr[Math.floor(Math.random() * arr.length)];

export const mapRange = (value, from1, to1, from2, to2) =>
  ((value - from1) * (to2 - from2)) / (to1 - from1) + from2;

export const lerp = (from, to, t) => from * (1 - t) + to * t;

export const lerpVec2 = (from, to, t) => [
  lerp(from[0], to[0], t),
  lerp(from[1], to[1], t)
];

export const lerpVec3 = (from, to, t) => [
  lerp(from[0], to[0], t),
  lerp(from[1], to[1], t),
  lerp(from[2], to[2], t)
];

export const lerpVec4 = (from, to, t) => [
  lerp(from[0], to[0], t),
  lerp(from[1], to[1], t),
  lerp(from[2], to[2], t),
  lerp(from[3], to[3], t)
];

export const uniformLerp = {
  float: lerp,
  vec2: lerpVec2,
  vec3: lerpVec3,
  vec4: lerpVec4
};

export const constrain = (num, low, high) => Math.min(Math.max(num, low), high);
