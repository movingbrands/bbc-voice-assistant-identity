const fs = require("fs-extra");
const { baseName } = require("../utils/fs");

const copyFile = ({ input, output }) => {
  new Promise((resolve, reject) => {
    const { extension } = baseName(input);
    fs.copy(input, `${output}.${extension}`, err => {
      if (err) reject(err);
      resolve(true);
    });
  });
};
module.exports = {
  copyFile
};
