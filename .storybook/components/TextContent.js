import React, { Fragment } from "react";
import * as Type from "Components/Typography";

export const TextContent = ({ content: c, index }) => (
  <Fragment>
    {c.map(({ component, children, props }, i) => {
      const TagComponent = component || Fragment;
      return (
        <TagComponent key={`text-content-${i}-${index}`} {...props}>
          {Array.isArray(children) ? (
            <TextContent content={children} index={index + 1} />
          ) : (
            children
          )}
        </TagComponent>
      );
    })}
  </Fragment>
);

TextContent.defaultProps = {
  index: 0
};
