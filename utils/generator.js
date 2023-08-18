const fs = require('fs');
const { Readable } = require('stream');

function enrichGenerator(generatorObj) {
    generatorObj.forEach = callbackfn => enrichGenerator(forEachGenerator(generatorObj, callbackfn));
    generatorObj.map = callbackfn => enrichGenerator(mapGenerator(generatorObj, callbackfn));

    return generatorObj;
}

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
    enrichGenerator,
    forEachGenerator,
    mapGenerator,
    writeGenerator
};
