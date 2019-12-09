import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean, withKnobs } from "@storybook/addon-knobs";

import styled from "styled-components";
import { parsedColors } from "Constants";
import * as Type from "Components/Typography";

import { Color } from "Utils/Color";
import { ColorContrastTest } from "Storybook/components/ColorContrastTest";
import { colors } from "Constants";

export const Swatch = styled.div`
  width: 25%;
  padding: 10px;
  height: 25vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Page = styled.main`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const stories = storiesOf("Typography|Styles", module);
stories.addDecorator(withKnobs);
stories.addParameters({ options: { showPanel: false } });

const colorStories = storiesOf("Typography|Color", module);
colorStories.addParameters({ options: { showPanel: false } });

Type.gelStyles.forEach(gelStyle => {
  stories.add(gelStyle, () => {
    const sampleText = text(
      "Preview text",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor suscipit accumsan. Morbi lobortis consectetur, vitae sagittis tellus vestibulum scelerisque."
    );
    return <Type.H3 gel={gelStyle}>{sampleText}</Type.H3>;
  });
  colorStories.add(gelStyle, () => {
    const sampleText = text("Preview text", "abc");
    return (
      <Page>
        {parsedColors.map(col => {
          return (
            <Swatch key={col.hex} style={{ backgroundColor: col.style }}>
              <Type.H3 gel={gelStyle} light={col.isDark}>
                {sampleText}
              </Type.H3>
              <ColorContrastTest
                foreground={
                  new Color(
                    col.isDark ? colors.text.white : colors.text.darkgrey
                  )
                }
                background={col}
              />
            </Swatch>
          );
        })}
      </Page>
    );
  });
});
