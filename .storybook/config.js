import { configure, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { generateSectionStory } from './utils/generateStory'

import "./global.css";
import theme from "./theme";

import introduction from '../data/introduction/index.json'
import colour from '../data/colour/index.json'
import typography from '../data/typography/index.json'
import motion from '../data/motion/index.json'
import userJourneys from '../data/user-journeys/index.json'
// import allData from '../data/index.json'
// import allData from '../data/index.json'
// import allData from '../data/index.json'
// import allData from '../data/index.json'

const loadStories = () => {
  generateSectionStory(introduction)
  generateSectionStory(colour)
  generateSectionStory(typography)
  generateSectionStory(motion)
  generateSectionStory(userJourneys)
  // allData.sections.forEach(section => {
  //   import(`../data${section.data}`).then(sectionData => {
  //     if (sectionData) {
  //       generateSectionStory(sectionData)
  //     }
  //   })
  // })
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

