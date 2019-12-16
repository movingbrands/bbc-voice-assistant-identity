import React from "react";
import styled from "styled-components";

import { colors } from "Constants";

import { dynamicColourStyles } from "../../utils/styledUtils";
import { Color } from "Utils/Color";
import { Asset } from "./Asset";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  ${dynamicColourStyles}
`;

const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  ${dynamicColourStyles}
  ${props => `justify-content: ${props.align}`};
`;

export const Section = ({
  children,
  align,
  backgroundColor,
  backgroundAsset
}) => {
  const bg = new Color(backgroundColor);
  return (
    <StyledSection
      align={align}
      backgroundColor={!backgroundAsset && bg}
      color={bg.isDark ? colors.neutral.white : colors.neutral.darkgrey}
    >
      {backgroundAsset && (
        <Background backgroundColor={bg}>
          <Asset {...backgroundAsset} />
        </Background>
      )}
      {children}
    </StyledSection>
  );
};

Section.defaultProps = {
  align: "flex-start",
  backgroundAsset: false,
  backgroundColor: "neutral.white"
};
