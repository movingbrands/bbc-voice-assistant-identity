import React, { Fragment } from "react";
import * as Type from "Components/Typography";
import { DownArrow } from "./DownArrow";
import styled, { css } from 'styled-components'
import { Color } from 'Utils/Color'
import { colors } from 'Constants'
import { compare } from "Utils/colorContrast";
import * as defaultWCAGContrastRatios from "Utils/colorContrastRatios";

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
  ${dynamicColourStyles}
`

const StyledHeader = styled.header`
  padding: 20px;
  display: flex;
  ${props => props.marginBottom && "margin-bottom: 80px;"}
  > h1, h2, h3 {
    max-width: 800px;
  }
`

const ColourPalette = () => {
  return <div>This is our colour palette</div>
}
const Image = (props) => {
  return <StyledImage src={props.src} />
}

const Video = ({ src, autoPlay, loop, controls }) => {
  return (
    <StyledVideo autoPlay={autoPlay} loop={loop} controls={controls}>
      <source src={src} type="video/mp4" />
    </StyledVideo>
  )
}

Video.defaultProps = {
  muted: false,
  loop: true,
  autoPlay: true,
  controls: false
}

const StyledBox = styled.div`
  width: 100%;
  padding: 20px;
  margin: 0;
  counter-increment: inst;
  position: relative;
  display: block;
  position: relative;
  ${props => props.as === 'li' && css`
    ::before {
      font-weight: bold;
      content: counter(inst);
      position: relative;
      display: block;
    }
    `}
    `

const StyledArticle = styled.article`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  ${props => props.as === 'ol' && css`
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  `}
  & > ${StyledBox} {
    ${props => `max-width: ${(1 / props.columns) * 100}%;`}
  }
  ${props => `align-items: ${props.align}`};
`

const Small = ({ children, ...rest }) =>
  <Type.P {...rest}>
    <small>{children}</small>
  </Type.P>

Small.defaultProps = {
  gel: "minion"
}
const dynamicColourStyles = ({ backgroundColor, color }) =>
  css`
    ${backgroundColor ? `background-color: ${new Color(backgroundColor).style};` : ''}
    ${color ? `color: ${new Color(color).style};` : ''}
    ${color ? `fill: ${new Color(color).style};` : ''}
    `

const Article = ({ columns, ...rest }) => {
  return <StyledArticle columns={columns || rest.children.length} {...rest} />
}

Article.defaultProps = {
  align: "flex-start"
}
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
  ${dynamicColourStyles}
    `


const Aside = styled.aside`
      padding: 20px;
      width: 100%;
      max-width: 400px;
  ${dynamicColourStyles}
    `

const Main = (props) => {
  return (
    <StyledMain>{props.children}</StyledMain>
  )
}

const Asset = (props) => props.type === 'video' ? <Video {...props} /> : <Image {...props} />

const Swatch = styled.div`
      width: calc(20% - 40px);
      height: calc(20vw - 20px);
      margin: 20px;
      padding: 10px;
  ${dynamicColourStyles}
    ${props => props.outline && "border: 1px solid rgba(0,0,0,0.1);"}
    `

const TypographyContrastSwatch = ({ foreground, background, children, ...rest }) => {
  const fg = new Color(foreground)
  const bg = new Color(background)
  const { result } = compare(bg, fg, defaultWCAGContrastRatios);
  return (
    <Fragment>
      <Swatch
        color={fg}
        backgroundColor={bg}
        {...rest}>
        {children}
        <Type.P>
          {result}
        </Type.P>
      </Swatch>
    </Fragment>
  )
}

const Section = ({ children, align, background }) => {
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
  aside: Aside,
  small: Small,
  videoWrapper: StyledVideoWrapper,
  typographyContrastSwatch: TypographyContrastSwatch,
  colourPalette: ColourPalette,
  downArrow: DownArrow
}

export const TextContent = ({ parentKey, children, type, nesting, ...rest }) => {
  const TagComponent = type && serializers[type] ? serializers[type] : Fragment;
  return (
    <TagComponent {...rest}>
      {!!children && typeof children === 'string' ?
        children : children.map((child, i) =>
          <TextContent
            {...child}
            nesting={nesting + 1}
            key={`${parentKey}_${type}_${nesting}_${i}`} />
        )
      }
    </TagComponent>
  )
};

TextContent.defaultProps = {
  parentKey: '',
  nesting: 0,
  children: []
};
