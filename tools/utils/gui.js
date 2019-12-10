const cliProgress = require('cli-progress');
 
const gui = new cliProgress.MultiBar({
    clearOnComplete: true,
    hideCursor: true
 
}, cliProgress.Presets.shades_grey);

module.exports = gui