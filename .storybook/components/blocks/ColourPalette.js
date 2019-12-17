import React, { Fragment } from "react";
import styled from "styled-components";

import { Color } from "Utils/Color";
import { colors } from "Constants";
import * as Type from "Components/Typography";
import { ColourSwatch } from "./Swatch";
import { Grid } from "./Grid";

const StyledColourPalette = styled.article``;

const StyledColourSection = styled.section`
  width: 100%;
`;

const H3 = styled(Type.H3)`
  padding: 20px;
  text-transform: capitalize;
`;

export const palettes = {
  light: {
    purple: "Primary Light Purple",
    green: "Primary Light Green",
    orange: "Secondary Light Orange",
    pink: "Secondary Light Pink",
    yellow: "Secondary Light Yellow"
  },
  dark: {
    purple: "Primary Dark Purple",
    green: "Primary Dark Green"
  },
  neutral: {
    darkgrey: "Dark Grey",
    grey6: "Grey 6",
    grey5: "Grey 5",
    grey4: "Grey 4",
    grey3: "Grey 3",
    grey2: "Grey 2",
    grey1: "Grey 1",
    white: "White"
  }
};

export const ColourPalette = ({ children, ...rest }) => (
  <StyledColourPalette {...rest}>
    {Object.keys(palettes).map(p => (
      <StyledColourSection>
        <H3>{p}</H3>
        <Grid>
          {Object.keys(palettes[p]).map(k => {
            const col = new Color(`${[p]}.${[k]}`);
            return (
              <ColourSwatch backgroundColor={col}>
                <Type.P bold>{palettes[p][k]}</Type.P>
                <Type.P>Hex {col.hex}</Type.P>
                <Type.P>RGB {col.rgb.join(" ")}</Type.P>
                {col.printColors && (
                  <Fragment>
                    <Type.P>Pantone {col.printColors.pantone}</Type.P>
                    <Type.P>CMYK {col.printColors.cmyk.join(" ")}</Type.P>
                  </Fragment>
                )}
              </ColourSwatch>
            );
          })}
        </Grid>
      </StyledColourSection>
    ))}
  </StyledColourPalette>
);
