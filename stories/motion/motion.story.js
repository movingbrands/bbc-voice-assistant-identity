import React from 'react'
import { storiesOf } from "@storybook/react";

import motionData from './motion.data.json'
import { parseDataToReact } from 'Storybook/utils/parseDataToReact'
import { generateStories } from 'Storybook/utils/generators'

const { title, children } = parseDataToReact(motionData)

const stories = storiesOf(title, module);
stories.addParameters({ options: { showPanel: false } });

generateStories(children, stories)
