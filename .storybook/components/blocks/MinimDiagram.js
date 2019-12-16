import React from "react";
import styled from "styled-components";

import { ContentSerializer } from "../ContentSerializer";
import { Asset } from "./Asset";
import { Color } from "Utils/Color";

const StyledWrapper = styled.div`
  padding: 20px;
`;
const StyledMinimDiagram = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid ${new Color("light.purple").style};
  margin: 150px 0 0 0;
`;
const StyledLabel = styled.div`
  position: absolute;
  top: -100px;
  height: 100px;
  left: 0;
  border-left: 1px solid ${new Color("neutral.white").style};
  padding: 0 10px;
`;
const StyledLabelOne = styled(StyledLabel)`
  height: 50%;
  left: 25%;
`;
const StyledLabelTwo = styled(StyledLabel)`
  left: 75%;
`;

export const MinimDiagram = ({
  backgroundAsset,
  labelOne,
  labelTwo,
  ...rest
}) => (
  <StyledWrapper>
    <StyledMinimDiagram>
      {backgroundAsset && <Asset {...backgroundAsset} />}
      <StyledLabelOne>
        <ContentSerializer {...labelOne} />
      </StyledLabelOne>
      <StyledLabelTwo>
        <ContentSerializer {...labelTwo} />
      </StyledLabelTwo>
    </StyledMinimDiagram>
  </StyledWrapper>
);
