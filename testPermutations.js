const fs = require('fs');
const { Readable } = require('stream');
const { getPermutationsLength } = require('./permutations');
const { getMinDiffPermutationsGenerator } = require('./permutationsOptimization');
const { createProgressBar, logDeltaTimeAsync } = require('./testUtils');

testPermutations(
    createCharSequence('A', 9),
    'output.txt',
    x => x.join('') + '\n'
);

async function testPermutations(set, outputFile, printModifier) {
    console.log(`input: ${JSON.stringify(set)}`);

    let generator = getMinDiffPermutationsGenerator(set);
    generator = forEachGenerator(generator, createCheckMinDiffPermutations());
    generator = forEachGenerator(generator, createProgressBar(getPermutationsLength(set.length), 30));
    generator = mapGenerator(generator, printModifier || defaultPrintModifier);

    try {
        await logDeltaTimeAsync(writeGenerator)(outputFile, generator);
        console.log(`result: ${outputFile}`);
    } catch (error) {
        console.error(`An error occurred while writing to ${outputFile}: ${error}`);
    }

    function defaultPrintModifier(value) {
        return value.join(' ') + '\n';
    }

    function createCheckMinDiffPermutations() {
        let prevValue = null;
        return value => {
            const isInvalid = prevValue && calcListDiff(prevValue, value) !== 2;
            if (isInvalid) throw new Error('Invalid adjacent permutations encountered');
            prevValue = value;
        }
    }
}

function* forEachGenerator(generator, callbackfn) {
    for (const value of generator) {
        callbackfn(value);
        yield value;
    }
};

function* mapGenerator(generator, callbackfn) {
    for (const value of generator) yield callbackfn(value);
};

async function writeGenerator(outputFile, generator) {
    const readable = Readable.from(generator);
    const writeStream = fs.createWriteStream(outputFile);

    return new Promise((resolve, reject) => {
        readable.pipe(writeStream);

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

function createCharSequence(startChar, length) {
    const startCharCode = startChar.charCodeAt(0);
    return Array.from({ length }, (_, i) => String.fromCharCode(startCharCode + i));
}

function calcListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}
