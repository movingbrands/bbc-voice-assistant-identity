import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(10px);
  }
  60% {
    transform: translateY(5px);
  }
`

const StyledSVG = styled.svg`
    width: 40px;
    height: 40px;   
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 1;
    & > * {
        fill: inherit;
    } 
    animation: ${bounce} 2s infinite ease-in-out;
`

export const DownArrow = () =>
    <StyledSVG
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <polygon points="25 40 41 14 33.84 14 25 29.32 16.16 14 9 14 25 40" />
    </StyledSVG>
