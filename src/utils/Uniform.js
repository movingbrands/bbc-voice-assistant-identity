import { Color } from "Utils/Color";
import { uniformLerp } from "Utils/number";

const defaultParams = {
  transition: false
};
export const uniform = (uniform, { transition } = defaultParams) => {
  if (uniform instanceof Color) {
    return {
      type: "vec4",
      value: uniform.vec4,
      ...(transition && { target: uniform.vec4, updateValue: uniformLerp.vec4 })
    };
  }
  // Single float
  if (typeof uniform === "number") {
    return {
      type: "float",
      value: uniform,
      ...(transition && { target: uniform, updateValue: uniformLerp.float })
    };
  }
  // Array: vector, array of floats, array of textures, or array of structs
  else if (Array.isArray(uniform)) {
    // Numeric values
    if (typeof uniform[0] === "number") {
      if (uniform.length === 1) {
        return {
          type: "float",
          value: uniform,
          ...(transition && { target: uniform, updateValue: uniformLerp.float })
        };
      }
      // float vectors (vec2, vec3, vec4)
      else if (uniform.length === 2) {
        return {
          type: "vec2",
          value: uniform,
          ...(transition && { target: uniform, updateValue: uniformLerp.vec2 })
        };
      } else if (uniform.length === 3) {
        return {
          type: "vec3",
          value: uniform,
          ...(transition && { target: uniform, updateValue: uniformLerp.vec3 })
        };
      } else if (uniform.length === 4) {
        return {
          type: "vec4",
          value: uniform,
          ...(transition && { target: uniform, updateValue: uniformLerp.vec4 })
        };
      }
      // float array
      else if (uniform.length > 4) {
        return {
          type: "float[]",
          value: uniform
        };
      }
    } else if (typeof uniform[0] === "string") {
      return {
        type: "sampler2D",
        value: uniform
      };
    }
  } else if (typeof uniform === "boolean") {
    return {
      type: "bool",
      value: uniform
    };
  } else if (typeof uniform === "string") {
    return {
      type: "sampler2D",
      value: uniform
    };
  }
};
