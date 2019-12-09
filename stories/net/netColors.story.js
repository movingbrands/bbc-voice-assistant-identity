import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, color, select } from "@storybook/addon-knobs";

import { Net } from "Components/Net";
import { brandColors, sizes } from "Constants";

const s = storiesOf("Net|Colors", module);
s.addDecorator(withKnobs);

s.add("Dark theme", () => {
  const voice = select("Voice", ["beeb", "user"], "beeb");
  const brand = select("Brand", [null, ...Object.keys(brandColors)], null);
  return (
    <Net
      width={sizes.medium.width}
      height={sizes.medium.height}
      voice={voice}
      brand={brand}
      theme="dark"
    />
  );
});

s.add("Light theme", () => {
  const voice = select("Voice", ["beeb", "user"], "beeb");
  const brand = select("Brand", [null, ...Object.keys(brandColors)], null);

  return (
    <Net
      width={sizes.medium.width}
      height={sizes.medium.height}
      voice={voice}
      brand={brand}
      theme="light"
    />
  );
});

s.add(
  "Using custom colors",
  () => {
    const background = color("Background", "#FFFFFF");
    const foreground = color("Foreground", "#000000");
    return (
      <Net
        width={sizes.medium.width}
        height={sizes.medium.height}
        foreground={foreground}
        background={background}
      />
    );
  },
  {
    notes:
      "Colour presets can be directly controlled without using presets by optionally adding a custom color (in CSS-style, e.g. #FFFFFF or rgb(255,255,255)"
  }
);

const sb = storiesOf("Net|Colors/With BBC brands", module);
sb.addDecorator(withKnobs);

sb.add("iPlayer", () => {
  const theme = select("Theme", ["dark", "light"], "light");
  return (
    <Net
      theme={theme}
      brand="iPlayer"
      width={sizes.medium.width}
      height={sizes.medium.height}
    />
  );
});
sb.add("Weather", () => {
  const theme = select("Theme", ["dark", "light"], "light");
  return (
    <Net
      theme={theme}
      width={sizes.medium.width}
      height={sizes.medium.height}
      brand="Weather"
    />
  );
});
sb.add("Sport", () => {
  const theme = select("Theme", ["dark", "light"], "light");
  return (
    <Net
      theme={theme}
      width={sizes.medium.width}
      height={sizes.medium.height}
      brand="Sport"
    />
  );
});
sb.add("Sounds", () => {
  const theme = select("Theme", ["dark", "light"], "light");
  return (
    <Net
      theme={theme}
      width={sizes.medium.width}
      height={sizes.medium.height}
      brand="Sounds"
    />
  );
});
