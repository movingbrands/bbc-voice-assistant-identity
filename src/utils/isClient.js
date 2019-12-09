/**
 * Helper to check if the code is running in a browser
 * This helps avoid errors in components that depend on
 * window when building static site in CI/node.js)
 */
export default typeof window === "object";
