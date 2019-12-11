import styled from 'styled-components'

export const VideoWrapper = styled.div`
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
