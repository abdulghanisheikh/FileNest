const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_API_KEY
});

const uploadToImagekit = async({buffer, fileName, folder = ""}) => {
    const uploadedFile = await imagekit.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    });

    return uploadedFile;
}

module.exports = {uploadToImagekit, imagekit};