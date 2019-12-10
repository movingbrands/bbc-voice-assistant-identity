import { configure, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { generateSectionStory } from './utils/generateStory'

import "./global.css";
import theme from "./theme";

import introduction from '../data/introduction/index.json'
import colour from '../data/colour/index.json'
import typography from '../data/typography/index.json'
import motion from '../data/motion/index.json'
import grid from '../data/grid/index.json'
import userJourneys from '../data/user-journeys/index.json'

const loadStories = () => {
  generateSectionStory(introduction)
  generateSectionStory(colour)
  generateSectionStory(typography)
  generateSectionStory(motion)
  generateSectionStory(grid)
  generateSectionStory(userJourneys)
};

addParameters({
  options: {
    theme,
    showPanel: true,
    panelPosition: "right",
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: false
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});

configure(loadStories, module);

