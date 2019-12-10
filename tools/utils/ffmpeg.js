const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstallation = require('@ffmpeg-installer/ffmpeg');
const ffprobeInstallation = require('@ffprobe-installer/ffprobe');

ffmpeg.setFfmpegPath(ffmpegInstallation.path)
ffmpeg.setFfprobePath(ffprobeInstallation.path)

module.exports = ffmpeg