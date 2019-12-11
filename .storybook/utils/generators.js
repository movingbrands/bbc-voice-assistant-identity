import React from 'react'
import { storiesOf } from "@storybook/react";

import { parseDataToReact } from './parseDataToReact'

export const generateStory = (data) => {
    const stories = storiesOf(data.title, module);
    stories.addParameters({ options: { showPanel: false } });

    const { children } = parseDataToReact(data)

    children.forEach(entry => {
        if (!entry.parent) {
            stories.add(entry.storybookTitle, () =>
                <entry.component {...entry.props} />
            )
        } else {
            const sectionStory = storiesOf(entry.storybookTitle, module)
            sectionStory.addParameters({ options: { showPanel: false } });
            sectionStory.add(`${entry.title}`, () =>
                <entry.component {...entry.props} />
            )
        }
    })
}

export const generateReact = (data) =>
    parseDataToReact(data)

export const generateStories = (children, stories) => {
    children.forEach(entry => {
        if (!entry.parent) {
            stories.add(entry.storybookTitle, () =>
                <entry.component {...entry.props} />
            )
        } else {
            const sectionStory = storiesOf(entry.storybookTitle, module)
            sectionStory.addParameters({ options: { showPanel: false } });
            sectionStory.add(`${entry.title}`, () =>
                <entry.component {...entry.props} />
            )
        }
    })
}