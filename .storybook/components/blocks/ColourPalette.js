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

const palettes = ["light", "dark", "neutral"];

export const ColourPalette = ({ children, ...rest }) => (
  <StyledColourPalette {...rest}>
    {palettes.map(p => (
      <StyledColourSection>
        <H3>{p}</H3>
        <Grid>
          {Object.keys(colors[p]).map(k => {
            const col = new Color(`${[p]}.${[k]}`);
            return (
              <ColourSwatch backgroundColor={col}>
                <Type.P bold>{k}</Type.P>
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
