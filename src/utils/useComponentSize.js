import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect
} from "react";
import { constrain } from "Utils/number";
import throttle from "lodash.throttle";
import isClient from "./isClient";

const getNode = (el, parent) => (parent ? el.parentNode : el);

const getSize = (el, maxWidth, aspectRatio) => {
  if (!el) {
    return {
      width: 0,
      height: 0
    };
  }
  const { offsetWidth, offsetHeight } = el;
  const width = constrain(offsetWidth, 0, maxWidth || window.innerWidth);
  const height = aspectRatio ? width * aspectRatio : offsetHeight;
  return {
    width,
    height
  };
};

export const useComponentSize = ({
  throttleWait = 250, // throttle resize events to every 1s for performance reasons
  parent = false,
  aspectRatio = null,
  maxWidth = null
} = {}) => {
  const ref = useRef();

  const [componentLoaded, setComponentLoaded] = useState(false);

  const [componentSize, setComponentSize] = useState(
    getSize(
      ref.current ? getNode(ref.current, parent) : {},
      maxWidth,
      aspectRatio
    )
  );

  useEffect(() => {
    if (componentSize.width) {
      setComponentLoaded(true);
    }
    return () => {
      setComponentLoaded(false);
    };
  }, [componentSize]);

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(
        getSize(getNode(ref.current, parent), maxWidth, aspectRatio)
      );
    }
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref.current) {
      return false;
    }

    handleResize();

    const throttledResize = throttle(handleResize, throttleWait);

    if (isClient && typeof ResizeObserver === "function") {
      let resizeObserver = new ResizeObserver(throttledResize);
      resizeObserver.observe(getNode(ref.current, parent));

      return () => {
        resizeObserver.disconnect(getNode(ref.current, parent));
        resizeObserver = null;
      };
    }
    isClient && window.addEventListener("resize", throttledResize);

    return () => {
      isClient && window.removeEventListener("resize", throttledResize);
    };
  }, [ref.current]);

  return [{ ref }, componentSize, componentLoaded];
};
