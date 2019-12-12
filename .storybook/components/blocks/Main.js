import React from "react";
import styled from "styled-components";

import { dynamicColourStyles } from "../../utils/styledUtils";

export const StyledMain = styled.main`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  ${dynamicColourStyles}
`;

export const Main = props => <StyledMain {...props} />;
