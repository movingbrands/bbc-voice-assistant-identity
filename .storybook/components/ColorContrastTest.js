import React from "react";
import styled from "styled-components";

import { compare } from "Utils/colorContrast";
import * as defaultWCAGContrastRatios from "Utils/colorContrastRatios";
import * as Type from "Components/Typography";

const ContrastResults = styled.aside`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const RatioResult = styled(Type.P)`
  padding: 0 10px;
  background: white;
  height: 55px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const TestResult = styled(Type.P)`
  font-size: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  text-align: center;
  height: 55px;
  background: white;
  ${props => (props.pass ? "" : "color: rgb(160,160,160)")};
`;
export const ColorContrastTest = ({
  color,
  backgroundColor,
  testRatios,
  sizes
}) => {
  const { result, tests } = compare(color, backgroundColor, testRatios);
  return (
    <ContrastResults>
      <RatioResult>{result}</RatioResult>
      {tests
        .filter(({ size }) => sizes.indexOf(size) > -1)
        .map(({ rating, size, pass }) => (
          <TestResult
            pass={pass}
            as="div"
            key={`${size}-${rating}-${color.hex}-${backgroundColor.hex}`}
          >
            {size}
            <br />
            {rating}
            <br />
            {pass ? "✔" : "✗"}
          </TestResult>
        ))}
    </ContrastResults>
  );
};

ColorContrastTest.defaultProps = {
  testRatios: defaultWCAGContrastRatios,
  sizes: ["small", "large"]
};
