import React from 'react'
import styled from 'styled-components'

import * as Type from 'Components/Typography'
import { Color } from 'Utils/Color'
import { compare } from "Utils/colorContrast";
import * as defaultWCAGContrastRatios from "Utils/colorContrastRatios";

import { dynamicColourStyles } from '../../utils/styledUtils'

export const Swatch = styled.div`
    width: calc(20% - 40px);
    height: calc(20vw - 20px);
    margin: 20px;
    padding: 10px;
    ${dynamicColourStyles}
    ${props => props.outline && "border: 1px solid rgba(0,0,0,0.1);"}
`

export const ColourSwatch = ({ color, backgroundColor, children, ...rest }) => {
  const fg = new Color(color)
  const bg = new Color(backgroundColor)
  const { result } = compare(bg, fg, defaultWCAGContrastRatios);
  return (
    <Swatch
      color={fg}
      backgroundColor={bg}
      {...rest}>
      {children}
      <Type.P>
        {result}
      </Type.P>
    </Swatch>
  )
}

