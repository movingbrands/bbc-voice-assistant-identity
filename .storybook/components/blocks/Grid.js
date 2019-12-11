import React from 'react'
import styled, { css } from 'styled-components'

export const Box = styled.div`
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

const StyledGrid = styled.article`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  ${props => props.as === 'ol' && css`
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  `}
  & > ${Box} {
    ${props => `max-width: ${(1 / props.columns) * 100}%;`}
  }
  ${props => `align-items: ${props.align}`};
`

export const Grid = ({ columns, ...rest }) =>
  <StyledGrid columns={columns || rest.children.length} {...rest} />

Grid.defaultProps = {
  align: "flex-start"
}


