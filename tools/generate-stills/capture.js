const puppeteer = require("puppeteer");
const queryString = require("query-string");
const path = require("path");

async function capturePage(props, exportDirectory) {
  const {
    width,
    height,
    pixelRatio,
    type,
    theme,
    brand,
    pulse,
    voice,
    wave
  } = props;
  const browser = await puppeteer.launch();

  const params = {
    "knob-Width": width,
    "knob-Height": height
  };
  if (theme) params["knob-Theme"] = theme;
  if (brand) params["knob-Brand"] = brand;
  if (voice) params["knob-Voice"] = voice;
  if (pulse) params["knob-Pulse"] = pulse;
  if (wave) params["knob-Wave"] = wave;

  const url = `http://localhost:6006/iframe.html?id=net--playground&${queryString.stringify(
    params
  )}`;

  const page = await browser.newPage();

  const filename = `BBC_Voice_${Object.keys(params)
    .map(k => params[k])
    .join("_")}.${type}`;

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: pixelRatio
  });
  const output = path.resolve(exportDirectory, filename);

  console.log(`Exporting: ${output}`);

  await page.goto(url);
  await page.screenshot({ type });
  await page.screenshot({ path: output });
  await browser.close();

  return Object.assign({}, props, { filename });
}

module.exports = capturePage;
