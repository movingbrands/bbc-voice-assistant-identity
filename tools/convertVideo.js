const ffmpeg = require('./utils/ffmpeg')
const gui = require('./utils/gui');

const codecs = {
  mp4: { video: 'libx264', audio: 'libmp3lame' },
  webm: { video: 'libvpx', audio: 'libvorbis' }
}

const convertVideo = ({
  input,
  output,
  audio = true,
  format = 'mp4',
  audioBitrate = '128k',
  size = '100%'
}) =>
  new Promise((resolve, reject) => {
    if (!input || !output)
      reject('Please provide valid input file and output filename')

    const targetCodec = codecs[format]

    if (!targetCodec)
      reject(`Invalid format: ${format}. Please choose one of ${Object.keys(codecs).join(', ')}`)

    const targetFile = `${output}.${format}`

    const conversion = ffmpeg(input)
    const fileMetadata = {}

    const progressBar = gui.create(1.0, 0);

    conversion.ffprobe(0, (err, metadata) => {
      fileMetadata.frames = metadata.streams[0].nb_frames
      fileMetadata.width = metadata.streams[0].width
      fileMetadata.height = metadata.streams[0].height
    });

    conversion.videoCodec(targetCodec.video)
      .size(size)
      .format(format)

    if (audio) {
      conversion.audioBitrate(audioBitrate)
        .audioCodec(targetCodec.audio)
        .audioChannels(2)
    }
    conversion.on('end', () => {
      gui.remove(progressBar);
      resolve(targetFile)
    })
    conversion.on('progress', (progress) => {
      if (fileMetadata.frames) {
        progressBar.update(progress.frames / fileMetadata.frames);
      }

    })
    conversion.on('error', (err) => {
      gui.remove(progressBar);
      reject(err.message)
    })
    conversion.save(targetFile)
  })

const generateScreenshot = ({
  input,
  output,
  format = 'jpg'
}) =>
  new Promise((resolve, reject) => {
    const targetFile = `${output}.${format}`

    const screenshot = ffmpeg(input)
      .seek('0.0')

    screenshot.save(targetFile)
    resolve(true)
  })

const convertVideoForWeb = ({
  input,
  output
}) =>
  new Promise((resolve, reject) => {
    Promise.all([
      convertVideo({ input, output, format: 'mp4' }),
    ]).then(r => {
      const result = {
        sources: [
          {
            type: 'mp4',
            src: r[0]
          }
        ],
        poster: {
          src: r[1]
        }
      }
      resolve(result)
    }).catch(reject)
  })

module.exports = {
  convertVideoForWeb
}