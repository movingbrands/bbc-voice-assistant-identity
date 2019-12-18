import isClient from "./isClient";
export default isClient
  ? function() {
      return window.performance.now();
    }
  : () => {
      return 0;
    };
