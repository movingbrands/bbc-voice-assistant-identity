import styled, { css } from "styled-components";
import {
  GEL_TRAFALGAR as trafalgar,
  GEL_PARAGON as paragon,
  GEL_DOUBLE_PICA as doublePica,
  GEL_GREAT_PRIMER as greatPrimer,
  GEL_BODY_COPY as bodyCopy,
  GEL_PICA as pica,
  GEL_LONG_PRIMER as longPrimer,
  GEL_BREVIER as brevier,
  GEL_MINION as minion,
  GEL_ATLAS as atlas,
  GEL_ELEPHANT as elephant,
  GEL_IMPERIAL as imperial,
  GEL_ROYAL as royal,
  GEL_FOOLSCAP as foolscap,
  GEL_CANON as canon
} from "@bbc/gel-foundations/typography";

import { colors } from "Constants";

const gelTypeStyles = {
  trafalgar: { css: trafalgar },
  paragon: { css: paragon },
  doublePica: { css: doublePica },
  greatPrimer: { css: greatPrimer },
  bodyCopy: { css: bodyCopy },
  pica: { css: pica },
  longPrimer: { css: longPrimer },
  brevier: { css: brevier },
  minion: { css: minion },
  atlas: { css: atlas },
  elephant: { css: elephant },
  imperial: { css: imperial },
  royal: { css: royal },
  foolscap: { css: foolscap },
  canon: { css: canon }
};

export const gelStyles = Object.keys(gelTypeStyles);

const baseStyles = css`
  margin: 0;
  padding: 0;
  position: relative;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  text-decoration: none;
`;

const dynamicStyles = ({ bold, dark, light, gel }) =>
  css`
    font-weight: ${bold ? "bold" : "normal"};
    ${gel && !!gelTypeStyles[gel] ? gelTypeStyles[gel].css : ""}
  `;

export const H1 = styled.h1`
  ${baseStyles}
  ${dynamicStyles}
`;

H1.defaultProps = {
  bold: true,
  gel: 'elephant'
};

export const H2 = styled.h2`
  ${baseStyles}
  ${dynamicStyles}
`;

H2.defaultProps = {
  bold: false
};

export const H3 = styled.h3`
  ${baseStyles}
  ${dynamicStyles}
`;

H3.defaultProps = {
  bold: false
};

export const H4 = styled.h4`
  ${baseStyles}
  ${dynamicStyles}
`;

H4.defaultProps = {
  bold: false
};

export const H5 = styled.h5`
  ${baseStyles}
  ${dynamicStyles}
`;

H5.defaultProps = {
  bold: false
};

export const H6 = styled.h6`
  ${baseStyles}
  ${dynamicStyles}
`;

H6.defaultProps = {
  bold: true
};

export const P = styled.p`
  ${baseStyles}
  ${dynamicStyles}
  max-width: 600px;
`;

P.defaultProps = {
  bold: false
};

export const Span = styled.span`
  ${baseStyles}
  ${dynamicStyles}
`;

Span.defaultProps = {
  bold: false
};

export const A = styled.a`
  border-bottom: 2px solid currentColor;
  ${baseStyles}
  ${dynamicStyles}
`;

A.defaultProps = {
  bold: true
};
