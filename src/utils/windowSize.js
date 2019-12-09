import isClient from "./isClient";

const DEFAULT_WINDOW = {
  width: 1024,
  height: 1024
};
export const windowSize = () =>
  isClient
    ? { width: window.innerWidth, height: window.innerHeight }
    : DEFAULT_WINDOW;
