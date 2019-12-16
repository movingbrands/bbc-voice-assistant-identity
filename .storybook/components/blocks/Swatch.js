import React from "react";
import styled from "styled-components";

import * as Type from "Components/Typography";
import { Color } from "Utils/Color";
import { compare } from "Utils/colorContrast";
import * as defaultWCAGContrastRatios from "Utils/colorContrastRatios";

import { dynamicColourStyles } from "../../utils/styledUtils";
import { colors } from "Constants";

export const Swatch = styled.div`
  width: calc(20% - 40px);
  height: calc(20vw - 20px);
  margin: 20px;
  padding: 10px;
  ${dynamicColourStyles}
`;

export const ColourSwatch = ({
  color,
  backgroundColor,
  children,
  contrastTest,
  ...rest
}) => {
  const bg = new Color(backgroundColor);
  const fg = new Color(
    color ? color : bg.isDark ? colors.neutral.white : colors.neutral.darkgrey
  );
  return (
    <Swatch color={fg} backgroundColor={bg} {...rest}>
      {children}
      <Type.P>
        {contrastTest
          ? compare(bg, fg, defaultWCAGContrastRatios).result
          : null}
      </Type.P>
    </Swatch>
  );
};

ColourSwatch.defaultProps = {
  contrastTest: false
};

const StyledColourComparisonSwatch = styled.div`
  display: flex;
  padding: 20px;
  & > ${Type.P} {
    margin-left: 10px;
  }
`;

const MiniSwatch = styled.div`
  width: 80px;
  height: 80px;
  ${dynamicColourStyles}
`;

export const ColourComparisonSwatch = ({
  color,
  backgroundColor,
  children,
  contrastTest,
  ...rest
}) => {
  const fg = new Color(color);
  const bg = new Color(backgroundColor);
  return (
    <StyledColourComparisonSwatch {...rest}>
      <MiniSwatch backgroundColor={bg} />
      <MiniSwatch backgroundColor={fg} />
      <Type.P>{children}</Type.P>
      <Type.P>
        {contrastTest
          ? compare(fg, bg, defaultWCAGContrastRatios).result
          : null}
      </Type.P>
    </StyledColourComparisonSwatch>
  );
};
