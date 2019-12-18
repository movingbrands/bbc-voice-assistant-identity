import { get } from "@ngard/tiny-get";
import { parseHex, parseNumberToHex, parseRGBString } from "Utils/parse";
import { constrain } from "Utils/number";
import { colors, printColors } from "Constants";

export class Color {
  r = 0.0;
  g = 0.0;
  b = 0.0;
  a = 1.0;
  presetColor = false;

  constructor(value, meta) {
    if (value instanceof Color) {
      return value;
    }
    if (meta) this.meta = meta;
    if (typeof get(colors, value) === "string") {
      this.presetColor = value;
      this.hex = get(colors, value);
    } else if (typeof value === "string") {
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
      this.rgb = [
        parseFloat(parsed[0]),
        parseFloat(parsed[1]),
        parseFloat(parsed[2])
      ];
    }
  }
  get hex() {
    return `#${parseNumberToHex(this.r)}${parseNumberToHex(
      this.g
    )}${parseNumberToHex(this.b)}`.toUpperCase();
  }
  set rgb(vecColor) {
    this.red = vecColor[0];
    this.green = vecColor[1];
    this.blue = vecColor[2];

    if (typeof vecColor[3] !== "undefined") this.alpha = vecColor[3];
  }
  get rgb() {
    return [
      parseInt(this.r * 255.0, 10),
      parseInt(this.g * 255.0, 10),
      parseInt(this.b * 255.0, 10)
    ];
  }
  get rgba() {
    return [
      parseInt(this.r * 255.0, 10),
      parseInt(this.g * 255.0, 10),
      parseInt(this.b * 255.0, 10),
      this.a
    ];
  }
  set red(r) {
    this.r = constrain(r, 0.0, 1.0);
  }
  set green(g) {
    this.g = constrain(g, 0.0, 1.0);
  }
  set blue(b) {
    this.b = constrain(b, 0.0, 1.0);
  }
  set alpha(alpha) {
    this.a = constrain(alpha, 0.0, 1.0);
  }
  get vec3() {
    return [this.r, this.g, this.b];
  }
  get vec4() {
    return [this.r, this.g, this.b, this.a];
  }
  get luma() {
    const result = this.vec3.map(v => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return result[0] * 0.2126 + result[1] * 0.7152 + result[2] * 0.0722;
  }
  get printColors() {
    const p = get(printColors, this.presetColor);
    return typeof p === "object" ? p : false;
  }
  get style() {
    if (this.a !== 1.0) {
      return `rgba(${this.rgba.join(",")})`;
    } else {
      return `rgb(${this.rgb.join(",")})`;
    }
  }
  equals(check) {
    return this.r === check.r && this.g === check.g && this.b === check.b;
  }
  get isDark() {
    return this.luma < 0.5;
  }
}
