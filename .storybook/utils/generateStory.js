import React from "react";
import { storiesOf } from "@storybook/react";

import { TextContent } from '../components/TextContent'

export const generateSectionStory = (data) => {
    const stories = storiesOf(data.title, module);
    stories.addParameters({ options: { showPanel: false } });

    data.pages && data.pages.forEach(page => {
        if (!page.parent) {
            stories.add(`${page.title}`, () =>
                <TextContent parentKey={page.title} {...page} />
            )
        } else {
            const sectionStory = storiesOf(`${data.title}|${page.parent}`, module)
            sectionStory.addParameters({ options: { showPanel: false } });
            sectionStory.add(`${page.title}`, () =>
                <TextContent parentKey={`${data.title}|${page.parent}`} {...page} />
            )
        }
    })
}