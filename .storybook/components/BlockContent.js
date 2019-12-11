import React, { Fragment } from "react";
import defaultSerializers from './defaultSerializers'

export const BlockContent = ({
  title,
  serializers,
  parentKey,
  children,
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
  serializers: defaultSerializers
};
