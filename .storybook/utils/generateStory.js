import React from "react";
import { storiesOf } from "@storybook/react";

import { TextContent } from '../components/TextContent'
import styled from "styled-components";


export const generateSectionStory = (data) => {
    const stories = storiesOf(data.title, module);
    stories.addParameters({ options: { showPanel: false } });

    data.pages && data.pages.forEach(page => {

        // if (page.overview) {
        stories.add(`${page.title}`, () => {
            return (
                <TextContent {...page} />
            )
        })
        // } else {
        //     const sectionStory = storiesOf(`${data.title}|${page.title}`, module)
        //     sectionStory.add(`${page.title}`, () => {
        //         return (
        //             <div>{page.title}</div>
        //         )
        //     })
        // }
    })
}