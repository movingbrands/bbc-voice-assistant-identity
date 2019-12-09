import { configure, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import "./global.css";
import theme from "./theme";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /\.story\.js$/);

const loadStories = () => {
  req.keys().forEach(filename => req(filename));
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
