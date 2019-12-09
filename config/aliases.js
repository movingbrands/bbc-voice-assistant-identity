const path = require("path");

const aliases = {
  Data: path.resolve(__dirname, '../data'),
  Storybook: path.resolve(__dirname, "../.storybook"),
  react: path.resolve(__dirname, "../node_modules/react"),
  Components: path.resolve(__dirname, "../src/components/"),
  WebGL: path.resolve(__dirname, "../src/webgl/"),
  Utils: path.resolve(__dirname, "../src/utils/"),
  Constants: path.resolve(__dirname, "../src/constants/")
};

module.exports = aliases;
