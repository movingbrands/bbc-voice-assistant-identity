import React from "react";
import styled from "styled-components";
import { withKnobs, number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";

import { Net } from "Components/Net";
import { numController } from "Storybook/knobs";
import { sizes } from "Constants";

const stories = storiesOf("Net prototype", module);
stories.addDecorator(withKnobs);

stories.add("Playground", () => {
  const wave = numController("Wave", Net.defaultProps.wave);
  const pulse = numController("Pulse", Net.defaultProps.pulse);
  const size = number("Size", Net.defaultProps.size, {
    range: true,
    min: 0.0,
    max: 50,
    step: 0.01
  });
  const movement = number("Movement", Net.defaultProps.movement, {
    range: true,
    min: 0.0,
    max: 4,
    step: 0.01
  });
  const theme = select("Theme", ["dark", "light"], "light");
  const voice = select("Voice", ["beeb", "user"], "beeb");
  const brand = select(
    "Brand",
    [null, "iPlayer", "Sounds", "Sport", "Weather"],
    null
  );
  const width = number("Width", sizes.medium.width, {
    range: false,
    min: 0,
    max: 1000,
    step: 10
  });
  const height = number("Height", sizes.medium.height, {
    range: false,
    min: 0,
    max: 1000,
    step: 10
  });

  return (
    <Net
      theme={theme}
      brand={brand}
      voice={voice}
      size={size}
      movement={movement}
      width={width}
      height={height}
      wave={wave}
      pulse={pulse}
    />
  );
});
