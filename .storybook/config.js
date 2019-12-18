import { configure, addParameters } from "@storybook/react";

import theme from "./theme";

import "./global.css";

addParameters({
  options: {
    theme,
    showPanel: true,
    panelPosition: "bottom",
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: false
  }
});

// the Net prototype folder has a few different stories in, so we'll import
// all files in there which end with '.story.js'
const netStories = require.context(
  "../stories/net-prototype",
  true,
  /\.story\.js$/
);

configure(() => {
  require("../stories/introduction/introduction.story");
  require("../stories/colour/colour.story");
  require("../stories/motion/motion.story");
  require("../stories/grid/grid.story");
  require("../stories/typography/typography.story");
  require("../stories/user-journeys/user-journeys.story");
  netStories.keys().forEach(filename => netStories(filename));
}, module);
