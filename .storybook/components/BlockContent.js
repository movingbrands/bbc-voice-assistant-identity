import React, { Fragment } from "react";
import contentSerializers from './contentSerializers'

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
