import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import { ResponsiveComponent } from "Components/Responsive";
import { Net } from "Components/Net";
import { colors, sizes } from "Constants";

const s = storiesOf("Net|Sizing", module);
s.addDecorator(withKnobs);

const cs = storiesOf("Net|Sizing/Core", module);

const ResponsiveNet = ResponsiveComponent(Net);

s.add("Responsive", () => <ResponsiveNet />, {
  notes:
    "This uses ResponsiveComponent and useComponentSize to fill the net to the width and height of its parent component"
});

Object.keys(sizes).forEach(k => {
  const { name, width, height } = sizes[k];
  cs.add(`${name} (${width}×${height})`, () => (
    <Net speed={0.01} width={width} height={height} theme="dark" voice="beeb" />
  ));
});
