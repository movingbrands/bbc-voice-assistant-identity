import React from "react";

import { useComponentSize } from "Utils/useComponentSize";

export const ResponsiveContainer = (Component, Wrapper) => props => {
  const [ref, componentSize, componentLoaded] = useComponentSize();

  return (
    <Wrapper {...ref}>
      {componentLoaded && <Component {...props} {...componentSize} />}
    </Wrapper>
  );
};

export const ResponsiveComponent = Component => props => {
  const [ref, componentSize, componentLoaded] = useComponentSize({
    parent: true
  });

  return (
    <Component
      {...ref}
      {...props}
      {...componentSize}
      componentMounted={componentLoaded}
    />
  );
};
