import React from "react";
import { storiesOf } from "@storybook/react";

export const generateStories = (children, stories, module) => {
  children.forEach(entry => {
    if (!entry.parent) {
      stories.add(entry.storybookTitle, () => (
        <entry.component {...entry.props} />
      ));
    } else {
      const sectionStory = storiesOf(entry.storybookTitle, module);
      sectionStory.addParameters({ options: { showPanel: false } });
      sectionStory.add(`${entry.title}`, () => (
        <entry.component {...entry.props} />
      ));
    }
  });
};
