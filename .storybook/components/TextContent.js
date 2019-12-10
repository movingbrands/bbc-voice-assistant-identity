import React, { Fragment } from "react";
import * as Type from "Components/Typography";
import styled, { css } from 'styled-components'
import { Color } from 'Utils/Color'
import { colors } from 'Constants'

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;  
`
const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;  
`

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`

const StyledHeader = styled.header`
  padding: 20px;
  display: flex;
  ${props => props.marginBottom && "margin-bottom: 80px;"}
  > h1, h2, h3 {
    max-width: 800px;
  }
`

const Image = (props) => {
  return <StyledImage src={props.src} />
}

const Video = (props) => {
  return (
    <StyledVideo autoPlay loop controls={false}>
      <source src={props.src} type="video/mp4" />
    </StyledVideo>
  )
}

const Article = styled.article`
  width: 100%;
  display: flex;
  ${props => `align-items: ${props.align}`};
`
const StyledSection = styled.section`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  ${props => `justify-content: ${props.align}`};
`

const StyledVideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 0;
  padding: 100px 40px 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  > video, img {
    width: initial;
    height: initial;
    max-width: 100%;
    max-height: 100%;
  }
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
  padding: 20px;
`

const Aside = styled.aside`
  padding: 20px;
  width: 100%;
  max-width: 400px;
`
const Main = (props) => {
  return (
    <StyledMain>{props.children}</StyledMain>
  )
}

const Asset = (props) => props.type === 'video' ? <Video {...props} /> : <Image {...props} />

const Grid = ({ items, numbered, align }) => {
  return (
    <Article align={align}>
      {items.map((child, i) =>
        <TextContent type="box" number={numbered && i + 1} children={child.children} />
      )}
    </Article>
  )
}

Grid.defaultProps = {
  numbered: false,
  align: "start"
}
const Section = ({ children, align, background }) => {
  const bg = new Color(background.color)
  const fg = bg.isDark ? colors.text.white : colors.text.darkgrey
  return (
    <StyledSection
      align={align}
      style={{
        color: fg,
        backgroundColor: !background.asset ? bg.style : ''
      }}>
      {background.asset && (
        <StyledBackground style={{ backgroundColor: bg.style }}>
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

const serializers = {
  h1: Type.H1,
  h2: Type.H2,
  h3: Type.H3,
  header: StyledHeader,
  image: Image,
  video: Video,
  p: Type.P,
  main: Main,
  section: Section,
  article: Article,
  box: StyledBox,
  grid: Grid,
  aside: Aside,
  videoWrapper: StyledVideoWrapper
}

export const TextContent = ({ children, number, index, type, ...rest }) => {
  const TagComponent = serializers[type] || Fragment;
  console.log(typeof children, children)
  return (
    <TagComponent {...rest}>
      {!!number && <Type.P bold>{number}.</Type.P>}
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
  type: false,
  props: {},
  children: []
};
