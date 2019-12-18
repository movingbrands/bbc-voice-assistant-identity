import React, { useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { netRenderer } from "WebGL/netRenderer";
import { generatePaletteMemo } from "Utils/colorUtils";
import { createMemo } from "Utils/createMemo";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const canvasSize = (width, height) => {
  return { width, height };
};

const canvasSizeMemo = createMemo(canvasSize);

export const Net = forwardRef(
  (
    {
      width,
      height,
      componentMounted,
      foreground,
      background,
      wave,
      pulse,
      pixelRatio,
      theme,
      voice,
      brand,
      transition,
      transitionRate,
      size,
      movement
    },
    ref
  ) => {
    const [backgroundColor, foregroundColor] = generatePaletteMemo(
      background,
      foreground,
      theme,
      voice,
      brand
    );

    const computedSize = canvasSizeMemo(width, height);
    const canvasRef = useRef();
    const net = useRef();

    useEffect(() => {
      if (componentMounted) {
        net.current = netRenderer({
          canvas: ref && ref.current ? ref.current : canvasRef.current,
          width,
          height,
          pixelRatio,
          backgroundColor,
          foregroundColor,
          transition,
          transitionRate,
          size,
          movement
        });
      }
      return () => {
        if (net.current) {
          net.current.stop();
        }
      };
    }, [componentMounted, canvasRef, ref]);

    useEffect(() => {
      if (componentMounted) {
        const { update, updateBackground } = net.current;
        update("uForegroundColor", foregroundColor.vec4);
        updateBackground(backgroundColor.vec4);
        update("uWave", wave);
        update("uPulse", pulse);
        update("uSize", size);
        update("uMovement", movement);
      }
    }, [backgroundColor, foregroundColor, wave, pulse, size, movement]);

    useEffect(() => {
      if (net.current) {
        // net.current.init(size)
        // net.current.stop()
      }
    }, [computedSize]);

    return (
      <Canvas
        ref={ref || canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        {...(!!width && { width, height })}
      />
    );
  }
);

Net.defaultProps = {
  componentMounted: true,
  wave: 0,
  pulse: 0,
  theme: "light",
  transition: true,
  transitionRate: 0.2,
  pixelRatio: 1.5,
  voice: "beeb",
  size: 15,
  movement: 1.0
};

Net.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  pixelRatio: PropTypes.number,
  foregroundColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  componentMounted: PropTypes.bool,
  transition: PropTypes.bool,
  transitionRate: PropTypes.number,
  wave: PropTypes.number,
  pulse: PropTypes.number,
  size: PropTypes.number,
  movement: PropTypes.number,
  theme: PropTypes.oneOf(["light", "dark"]),
  voice: PropTypes.oneOf(["beeb", "user"]),
  brand: PropTypes.string
};
