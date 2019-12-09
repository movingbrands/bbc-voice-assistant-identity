const path = require("path");
const aliases = require("../config/aliases");

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(glsl|vert|frag)$/,
    use: "raw-loader"
  });

  config.resolve.alias = aliases;

  return config;
};
