import { css } from "styled-components";

import { Color } from "Utils/Color";

export const dynamicColourStyles = ({ backgroundColor, color, outline }) =>
  css`
    ${
      backgroundColor
        ? `background-color: ${new Color(backgroundColor).style};`
        : ""
    }
    ${color ? `color: ${new Color(color).style};` : ""}
    ${color ? `fill: ${new Color(color).style};` : ""}
    ${props => props.outline && "border: 1px solid rgba(0,0,0,0.1);"}
    `;
