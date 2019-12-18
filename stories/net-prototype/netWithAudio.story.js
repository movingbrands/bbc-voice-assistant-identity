import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import { Net } from "Components/Net";
import { speedController } from "Storybook/knobs";
import { sizes } from "Constants";
import { useMicrophone } from "Utils/useMicrophone";

const s = storiesOf("Net prototype|Audio", module);
s.addDecorator(withKnobs);

s.add("useMicrophone", () => {
  const speed = speedController("Speed", 0.015);
  const fft = useMicrophone(32);
  const { width, height } = sizes.medium;

  return (
    <Net
      speed={speed}
      pulse={fft}
      movement={fft * 2}
      size={15 + 10 * fft}
      width={width}
      height={height}
    />
  );
});
