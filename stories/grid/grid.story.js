import React from 'react'
import { storiesOf } from "@storybook/react";

import gridData from './grid.data.json'
import { parseDataToReact } from 'Storybook/utils/parseDataToReact'
import { generateStories } from 'Storybook/utils/generators'

const { title, children } = parseDataToReact(gridData)

const stories = storiesOf(title, module);
stories.addParameters({ options: { showPanel: false } });

generateStories(children, stories)
