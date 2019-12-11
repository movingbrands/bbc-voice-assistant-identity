const { baseName } = require('../utils/fs')

const sharp = require('sharp')

const convertImage = ({ input, output, extension }) => {
    new Promise((resolve, reject) => {
        const image = sharp(input)
        if (extension === 'jpg') {
            image.jpeg({
                quality: 85,
                chromaSubsampling: '4:4:4'
            })
        } else if (extension === 'png') {
            image.png({
                compressionLevel: 6,
                quality: 90
            })
        }

        image.toFile(output, (err) => {
            if (err) reject(err)
            resolve(true)
        });
    })
}

const convertImageForWeb = ({ input, output }) => {
    const { extension } = baseName(input)
    return convertImage({ input, output: `${output}.${extension}`, extension })
}
module.exports = {
    convertImageForWeb
}