const { existsSync, mkdirSync, writeJson } = require("fs-extra");
const path = require("path");
const capturePage = require("./capture");
const exportDirectory = path.resolve(__dirname, "../../exports");
const manifestName = "export-manifest.json";

if (!existsSync(exportDirectory)) mkdirSync(exportDirectory);

const commonSettings = {
  width: 1200,
  height: 1200,
  pixelRatio: 2,
  type: "png"
};

const presets = [
  {
    brand: "iPlayer",
    theme: "dark",
    pulse: 1.0
  },
  {
    brand: "iPlayer",
    theme: "light"
  },
  {
    voice: "user",
    theme: "light"
  },
  {
    voice: "user",
    theme: "dark"
  }
];

Promise.all(
  presets.map(preset =>
    capturePage(Object.assign({}, commonSettings, preset), exportDirectory)
  )
).then(exports => {
  console.log(`${presets.length} files exported`);
  writeJson(path.resolve(exportDirectory, `./${manifestName}`), {
    created: new Date(),
    exports
  });
});
