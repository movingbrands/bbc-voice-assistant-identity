const path = require("path");

const aliases = {
  Storybook: path.resolve(__dirname, "../.storybook"),
  Components: path.resolve(__dirname, "../src/components/"),
  Utils: path.resolve(__dirname, "../src/utils/"),
  Constants: path.resolve(__dirname, "../src/constants/"),
  WebGL: path.resolve(__dirname, "../src/webgl/")
};

module.exports = aliases;
