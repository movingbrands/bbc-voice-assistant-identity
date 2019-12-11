import styled from 'styled-components'

export const Header = styled.header`
  padding: 20px;
  display: flex;
  ${props => props.marginBottom && "margin-bottom: 80px;"}
  > h1, h2, h3 {
    max-width: 800px;
  }
`
