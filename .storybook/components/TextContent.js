import React, { Fragment } from "react";
import * as Type from "Components/Typography";
import styled, { css } from 'styled-components'
import { Color } from 'Utils/Color'
import { colors } from 'Constants'

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`

const Image = (props) => {
  return <StyledImage src={props.src} />
}

const StyledArticle = styled.article`
  width: 100%;
  display: flex;
`
const StyledSection = styled.section`
  width: 100%;
  height: 100vh;
  padding: 20px;
  position: relative;
`

const StyledMain = styled.main`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
`

const StyledBox = styled.div`
  width: 100%;
  height: 100%;
`
const Main = (props) => {
  return (
    <StyledMain>{props.children}</StyledMain>
  )
}

const Section = ({ children, background }) => {
  const bg = new Color(background.color)
  const fg = bg.isDark ? colors.text.white : colors.text.darkgrey
  return (
    <StyledSection style={{
      color: fg,
      backgroundColor: !background.asset ? bg.style : ''
    }}>
      {background.asset && (
        <StyledBackground style={{ backgroundColor: bg.style }}>
          <Image {...background.asset} />
        </StyledBackground>
      )}
      {children}
    </StyledSection>
  )
}

Section.defaultProps = {
  background: {
    color: "#FFFFFF"
  }
}

const serializers = {
  h1: Type.H1,
  h2: Type.H2,
  image: Image,
  p: Type.P,
  main: Main,
  section: Section,
  article: StyledArticle,
  box: StyledBox
}

export const TextContent = ({ children, index, type, props }) => {
  const TagComponent = serializers[type] || Fragment;
  return (
    <TagComponent {...props}>
      {!!children && typeof children === 'string' ?
        children : children.map((child, i) =>
          <TextContent {...child} index={index + 1} />
        )
      }
    </TagComponent>
  )
};

TextContent.defaultProps = {
  index: 0,
  props: {},
  children: []
};
