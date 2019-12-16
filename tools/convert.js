const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");

const { convertVideoForWeb } = require("./converters/convertVideo");
const { convertImageForWeb } = require("./converters/convertImage");
const { copyFile } = require("./converters/copyFile");

const { baseName } = require("./utils/fs");
const gui = require("./utils/gui");

const outputDirectory = path.resolve(__dirname, "../converted");
const inputDirectory = path.resolve(__dirname, "../artwork");

const converters = {
  jpg: convertImageForWeb,
  mp4: convertVideoForWeb,
  png: convertImageForWeb,
  svg: copyFile,
  mp3: copyFile
};

const convertFile = file =>
  new Promise((resolve, reject) => {
    const { parent, base, extension } = baseName(file);
    const targetFolder = parent.split(inputDirectory).pop();

    fs.ensureDir(`${outputDirectory}/${targetFolder}`)
      .then(() => {
        const Conversion = converters[extension];
        Conversion({
          input: file,
          output: `${outputDirectory}/${targetFolder}/${base}`
        })
          .then(r => {
            resolve(r);
          })
          .catch(reject);
      })
      .catch(reject);
  });

glob(`${inputDirectory}/**/*@(.mp4|.png|.jpg|.svg|.mp3)`, (er, files) => {
  Promise.all(files.map(convertFile)).then(f => {
    gui.stop();
    console.log(`${f.length} files converted`);
  });
});
