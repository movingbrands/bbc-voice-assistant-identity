import Phenomenon from "phenomenon";

import {
  generateAttributes,
  generateUniforms,
  generateRatio,
  generateBackgroundGeometry,
  generateBackgroundUniforms
} from "./generators";
import { constrain, lerpVec4 } from "Utils/number";
import { isValidElement } from "Utils/dom";

import minimVertex from "./glsl/minim.vertex.glsl";
import minimFragment from "./glsl/minim.fragment.glsl";
import backgroundVertex from "./glsl/background.vertex.glsl";
import backgroundFragment from "./glsl/background.fragment.glsl";

export const netRenderer = ({
  canvas,
  width,
  height,
  pixelRatio,
  backgroundColor,
  foregroundColor,
  transition,
  transitionRate,
  size,
  movement
}) => {
  const params = {
    context: {
      alpha: false,
      antialias: true
    }
  };

  if (!isValidElement(canvas, "CANVAS")) {
    throw new Error(`Missing a valid canvas element`);
  }

  const renderer = new Phenomenon({
    canvas,
    context: params.context,
    settings: {
      devicePixelRatio: pixelRatio || constrain(window.devicePixelRatio, 1, 2),
      clearColor: [1.0, 1.0, 1.0, 1.0],
      shouldRender: true
    }
  });

  const [uniforms, animateduniforms] = generateUniforms(
    width,
    height,
    foregroundColor,
    size,
    movement,
    { transition }
  );

  const rows = parseInt(height / 20, 10);
  const columns = parseInt(width / 20, 10);

  const [backgrounduniforms] = generateBackgroundUniforms(backgroundColor, {
    transition
  });

  const backgroundInstance = renderer.add("Background", {
    vertex: backgroundVertex,
    fragment: backgroundFragment,
    uniforms: backgrounduniforms,
    mode: 4,
    onRender: instance => {
      instance.uniforms.uBackgroundColor.value = lerpVec4(
        instance.uniforms.uBackgroundColor.value,
        instance.uniforms.uBackgroundColor.target,
        transitionRate
      );
    },
    geometry: generateBackgroundGeometry()
  });

  const updateBackground = value => {
    backgroundInstance.uniforms.uBackgroundColor.target = value;
  };

  const rendererInstance = renderer.add("minims", {
    attributes: generateAttributes(rows, columns, generateRatio(width, height)),
    multiplier: rows * columns,
    uniforms,
    vertex: minimVertex,
    fragment: minimFragment,
    onRender: instance => {
      instance.uniforms.uTime.value += 0.01;
      for (let i = 0; i < animateduniforms.length; i++) {
        const name = animateduniforms[i];
        const { target, updateValue } = instance.uniforms[name];
        instance.uniforms[name].value = updateValue(
          instance.uniforms[name].value,
          target,
          transitionRate
        );
      }
    }
  });

  const init = () => {
    // renderer.remove("minims");
  };
  const update = (key, value) => {
    const targetuniform = rendererInstance.uniforms[key];

    if (!targetuniform) {
      throw new Error(`Could not find uniform: ${key}`);
    } else {
      rendererInstance.uniforms[key][
        targetuniform.updateValue ? "target" : "value"
      ] = value;
    }
  };

  const stop = () => {
    renderer.shouldRender = false;
    renderer.destroy();
  };
  return {
    renderer,
    instance: rendererInstance,
    update,
    updateBackground,
    init,
    stop
  };
};
