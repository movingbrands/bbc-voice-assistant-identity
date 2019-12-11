import React from 'react'
import styled from 'styled-components'

import { colors } from 'Constants'

import { dynamicColourStyles } from '../../utils/styledUtils'
import { Color } from 'Utils/Color'
import { Video } from './Video'
import { Image } from './Image'

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  ${dynamicColourStyles}
`

const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  ${dynamicColourStyles}
  ${props => `justify-content: ${props.align}`};
`

const Asset = props =>
  props.type === 'video' ? <Video {...props} /> : <Image {...props} />

export const Section = ({ children, align, background }) => {
  const bg = new Color(background.color)
  return (
    <StyledSection
      align={align}
      backgroundColor={!background.asset && bg}
      color={bg.isDark ? colors.text.white : colors.text.darkgrey}>
      {background.asset && (
        <StyledBackground
          backgroundColor={bg}>
          <Asset {...background.asset} />
        </StyledBackground>
      )}
      {children}
    </StyledSection>
  )
}

Section.defaultProps = {
  align: "flex-start",
  background: {
    color: "#FFFFFF"
  }
}