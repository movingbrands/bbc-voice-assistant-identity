const fs = require('fs-extra')
const glob = require('glob')
const path = require('path')

const { convertVideoForWeb } = require('./convertVideo')
const { convertImageForWeb } = require('./convertImage')
const { baseName } = require('./utils/fs')
const gui = require('./utils/gui')

const outputDirectory = path.resolve(__dirname, '../converted')

const converters = {
    jpg: convertImageForWeb,
    mp4: convertVideoForWeb,
    png: convertImageForWeb
}

const convertFile = file =>
    new Promise((resolve, reject) => {
        const { parent, base, extension } = baseName(file)

        fs.ensureDir(`${outputDirectory}/${parent}`)
            .then(() => {

                const Conversion = converters[extension]

                Conversion({
                    input: file,
                    output: `${outputDirectory}/${parent}/${base}`
                }).then(r => {
                    resolve(r)
                }).catch(reject)

            }).catch(reject)
    })

glob(path.resolve(__dirname, `../artwork/**/*@(.mp4|.png|.jpg)`), (er, files) => {
    Promise.all(files.map(convertFile)).then(f => {
        gui.stop()
        console.log(`${f.length} files converted`)
    })
})