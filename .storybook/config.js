import { configure, addParameters } from "@storybook/react";

import theme from "./theme";

import "./global.css";

addParameters({
  options: {
    theme,
    showPanel: true,
    panelPosition: "right",
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: false
  }
});

configure(() => {
  require("../stories/introduction/introduction.story");
  require("../stories/colour/colour.story");
  require("../stories/motion/motion.story");
  require("../stories/grid/grid.story");
  require("../stories/typography/typography.story");
  require("../stories/user-journeys/user-journeys.story");
}, module);
