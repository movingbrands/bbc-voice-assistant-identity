import React, { Fragment } from "react";
import contentSerializers from './contentSerializers'

// takes the data structure and converts it into a tree of React
// components, using the 'type' property to match it to a specific 
// React component in the contentSerializers object, and passing
// all other props to the Component

export const BlockContent = ({
  title,
  serializers,
  parentKey,
  children,
  parent,
  type,
  nesting,
  ...rest
}) => {
  const TagComponent = type && serializers[type] ? serializers[type] : Fragment;
  return (
    <TagComponent {...rest}>
      {!!children && typeof children === 'string' ?
        children : children.map((child, i) =>
          <BlockContent
            parent={parent}
            title={title}
            {...child}
            nesting={nesting + 1}
            key={`${parentKey}_${type}_${nesting}_${i}`} />
        )
      }
    </TagComponent>
  )
};

BlockContent.defaultProps = {
  parentKey: '',
  nesting: 0,
  children: [],
  serializers: contentSerializers
};
