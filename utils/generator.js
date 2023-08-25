import { createWriteStream } from "fs";
import { Readable } from "stream";

export function enrichGenerator(generatorObj) {
    generatorObj.forEach = callbackfn => enrichGenerator(forEachGenerator(generatorObj, callbackfn));
    generatorObj.map = callbackfn => enrichGenerator(mapGenerator(generatorObj, callbackfn));

    return generatorObj;
}

export function* forEachGenerator(generator, callbackfn) {
    for (const value of generator) {
        callbackfn(value);
        yield value;
    }
}

export function* mapGenerator(generator, callbackfn) {
    for (const value of generator) yield callbackfn(value);
}

export async function writeGenerator(outputFile, generator) {
    const readable = Readable.from(generator);
    const writeStream = createWriteStream(outputFile);

    return new Promise((resolve, reject) => {
        readable.pipe(writeStream);

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}
