const fs = require('fs');
const { Readable } = require('stream');
const { getPermutationsLength, getPermutationAtIndex } = require('./permutations');

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

function createProgressBar(total, width) {
    let completed = 0;
    let prevProgressWidth = -1;

    return () => {
        completed++;
        const progressWidth = Math.floor((completed / total) * width);

        if (progressWidth === prevProgressWidth) return;

        process.stdout.write(`\rprogress: [${'='.repeat(progressWidth)}${' '.repeat(width - progressWidth)}]`);

        prevProgressWidth = progressWidth;

        if (completed === total) process.stdout.write(`\n`);
    };
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

function logDeltaTimeAsync(asyncCallback) {
    return async (...args) => {
        console.log(`${asyncCallback.name}...`);
        const [deltaTime, result] = await getDeltaTimeAsync(asyncCallback.bind(null, ...args));
        console.log(`${asyncCallback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

async function getDeltaTimeAsync(asyncCallback) {
    const startTime = performance.now();
    const result = await asyncCallback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

function* getMinDiffPermutationsGenerator(set) {
    for (let i = 0; i < getPermutationsLength(set.length); i++)
        yield getMinDiffPermutationAtIndex(set, i);
}

function getMinDiffPermutationAtIndex(set, index) {
    const minDiffPermutationSwapIndex = getMinDiffPermutationSwapIndex(set.length, index);
    return getPermutationAtIndex(set, minDiffPermutationSwapIndex);
}

function getMinDiffPermutationSwapIndex(length, index) {
    const permutationsLength = getPermutationsLength(length);

    if (index < 0 || index >= permutationsLength) throw new RangeError();

    let height = permutationsLength / length--;
    let offset = 0;

    while (length > 1) {
        const leftover = Math.floor(index / height);
        const isOdd = leftover % 2 === 1;
        offset += leftover * height;
        index %= height;
        if (isOdd) index = height - index - 1;
        height /= length--;
    }

    return index + offset;
}

function calcListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}
