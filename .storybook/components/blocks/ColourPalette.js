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
    purple: {
      label: "Primary",
      name: "Light Purple"
    },
    green: {
      label: "Primary",
      name: "Light Green"
    },
    orange: {
      label: "Secondary",
      name: "Light Orange"
    },
    pink: {
      label: "Secondary",
      name: "Light Pink"
    },
    yellow: {
      label: "Secondary",
      name: "Light Yellow"
    }
  },
  dark: {
    purple: {
      label: "Primary",
      name: "Dark Purple"
    },
    green: {
      label: "Primary",
      name: "Dark Green"
    }
  },
  neutral: {
    darkgrey: { name: "Dark Grey" },
    grey6: { name: "Grey 6" },
    grey5: { name: "Grey 5" },
    grey4: { name: "Grey 4" },
    grey3: { name: "Grey 3" },
    grey2: { name: "Grey 2" },
    grey1: { name: "Grey 1" },
    white: { name: "White" }
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
            const { name, label } = palettes[p][k];
            return (
              <ColourSwatch backgroundColor={col}>
                <Type.P bold>{name}</Type.P>
                {label ? <Type.P bold>{label}</Type.P> : null}
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
