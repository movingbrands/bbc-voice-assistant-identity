import { parseHex, parseNumberToHex, parseRGBString } from "Utils/parse";

export class Color {
  r = 0.0;
  g = 0.0;
  b = 0.0;
  a = 1.0;

  constructor(value, meta) {
    if (value instanceof Color) {
      return value;
    }
    if (meta) this.meta = meta;
    if (typeof value === "string") {
      if (value.startsWith("#")) {
        this.hex = value;
      } else if (value.startsWith("rgb")) {
        this.rgb = parseRGBString(value);
      }
    } else if (
      value.constructor === Array &&
      (value.length === 3 || value.length === 4)
    ) {
      this.rgb = value;
    } else {
      throw new Error(`${value} is not a valid color`);
    }
  }
  set hex(hexColor) {
    const parsed = parseHex(hexColor);
    if (parsed) {
      this.r = parseFloat(parsed[0]);
      this.g = parseFloat(parsed[1]);
      this.b = parseFloat(parsed[2]);
    }
  }
  get hex() {
    return `#${parseNumberToHex(this.r)}${parseNumberToHex(
      this.g
    )}${parseNumberToHex(this.b)}`.toUpperCase();
  }
  set rgb(vecColor) {
    this.r = vecColor[0];
    this.g = vecColor[1];
    this.b = vecColor[2];

    if (typeof vecColor[3] !== "undefined") this.a = vecColor[3];
  }
  set alpha(alpha) {
    this.a = alpha;
  }
  get vec3() {
    return [this.r, this.g, this.b];
  }
  get vec4() {
    return [this.r, this.g, this.b, this.a];
  }
  get luma() {
    return Math.sqrt(
      0.299 * (this.r * this.r) +
        0.587 * (this.g * this.g) +
        0.114 * (this.b * this.b)
    );
  }
  get style() {
    if (this.a !== 1.0) {
      return `rgba(${parseInt(this.r * 255.0, 10)}, ${parseInt(
        this.g * 255.0,
        10
      )}, ${parseInt(this.b * 255.0, 10)}, ${this.a})`;
    } else {
      return `rgb(${parseInt(this.r * 255.0, 10)}, ${parseInt(
        this.g * 255.0,
        10
      )}, ${parseInt(this.b * 255.0, 10)})`;
    }
  }
  equals(check) {
    return this.r === check.r && this.g === check.g && this.b === check.b;
  }
  get isDark() {
    return this.luma < 0.5;
  }
}
