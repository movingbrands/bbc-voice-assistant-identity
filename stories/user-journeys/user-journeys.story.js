import React from "react";
import { storiesOf } from "@storybook/react";

import userJourneysData from "./user-journeys.data.json";
import { parseDataToReact } from "Storybook/utils/parseDataToReact";
import { generateStories } from "Storybook/utils/generators";

const { title, children } = parseDataToReact(userJourneysData);

const stories = storiesOf(title, module);
stories.addParameters({ options: { showPanel: false } });

generateStories(children, stories, module);
