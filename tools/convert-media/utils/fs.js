const path = require("path");

const baseName = file => {
  return {
    extension: path
      .extname(file)
      .split(".")
      .pop(),
    parent: path.dirname(file),
    base: path.basename(file).replace(/\.[^/.]+$/, "")
  };
};

module.exports = {
  baseName
};
