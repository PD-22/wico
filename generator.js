const fs = require('fs');
const { Readable } = require('stream');

function* forEachGenerator(generator, callbackfn) {
    for (const value of generator) {
        callbackfn(value);
        yield value;
    }
}

function* mapGenerator(generator, callbackfn) {
    for (const value of generator) yield callbackfn(value);
}

async function writeGenerator(outputFile, generator) {
    const readable = Readable.from(generator);
    const writeStream = fs.createWriteStream(outputFile);

    return new Promise((resolve, reject) => {
        readable.pipe(writeStream);

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

module.exports = {
    forEachGenerator,
    mapGenerator,
    writeGenerator
};
