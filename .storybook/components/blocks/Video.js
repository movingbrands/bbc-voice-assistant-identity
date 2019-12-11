import React from 'react'
import styled from 'styled-components'

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;  
`

export const Video = ({ src, autoPlay, loop, controls }) =>
  <StyledVideo autoPlay={autoPlay} loop={loop} controls={controls}>
    <source src={src} type="video/mp4" />
  </StyledVideo>

Video.defaultProps = {
  muted: false,
  loop: true,
  autoPlay: true,
  controls: false
}
