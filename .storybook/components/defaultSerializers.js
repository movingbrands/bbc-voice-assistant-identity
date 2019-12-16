import * as Type from "Components/Typography";

import { DownArrow } from "./blocks/DownArrow";
import { Video } from "./blocks/Video";
import { Section } from "./blocks/Section";
import { Image } from "./blocks/Image";
import { Header } from "./blocks/Header";
import { ColourPalette } from "./blocks/ColourPalette";
import { Grid, Box } from "./blocks/Grid";
import { Small } from "./blocks/Small";
import { VideoWrapper } from "./blocks/VideoWrapper";
import { Main } from "./blocks/Main";
import { Aside } from "./blocks/Aside";
import { ColourSwatch, Swatch, ColourComparisonSwatch } from "./blocks/Swatch";
import { MinimDiagram } from "./blocks/MinimDiagram";

const defaultSerializers = {
  h1: Type.H1,
  h2: Type.H2,
  h3: Type.H3,
  p: Type.P,
  small: Small,
  header: Header,
  image: Image,
  video: Video,
  main: Main,
  section: Section,
  grid: Grid,
  box: Box,
  aside: Aside,
  videoWrapper: VideoWrapper,
  colourSwatch: ColourSwatch,
  swatch: Swatch,
  colourPalette: ColourPalette,
  colourComparisonSwatch: ColourComparisonSwatch,
  downArrow: DownArrow,
  minimDiagram: MinimDiagram
};

export default defaultSerializers;
