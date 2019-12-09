import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { parsedColors } from "Constants";
import { colors } from "Constants";
import * as Typography from "Components/Typography";
import { ColorContrastTest } from "Storybook/components/ColorContrastTest";
import { Color } from "Utils/Color";
import { cycleColorBackgrounds } from "Utils/css";

export const SwatchRow = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
export const Swatch = styled.div`
  width: 33.33%;
  padding: 10px;
  height: 33.33vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Article = styled.article`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  animation: cycleColor 10s normal infinite linear;
  ${cycleColorBackgrounds(
    "cycleColor",
    Object.keys(colors.light).map(c => colors.light[c])
  )}
`;

const overview = storiesOf("Color", module);
overview.addDecorator(withKnobs);

overview.add("Overview", () => (
  <Main>
    <Article>Color</Article>
  </Main>
));

const stories = storiesOf("Color|Palette", module);
stories.addDecorator(withKnobs);

// export default (stories) => {
stories.add("All", () => {
  return (
    <SwatchRow>
      {parsedColors.map(col => {
        return (
          <Swatch key={col.hex} style={{ backgroundColor: col.style }}>
            {col.meta && (
              <Typography.H3 light={col.isDark}>{col.meta}</Typography.H3>
            )}
            <Typography.P light={col.isDark}>{col.hex}</Typography.P>
            <ColorContrastTest
              foreground={
                new Color(col.isDark ? colors.text.white : colors.text.darkgrey)
              }
              background={col}
            />
          </Swatch>
        );
      })}
    </SwatchRow>
  );
});
// }
