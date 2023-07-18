const { getPermutationsLength } = require('./permutations');
const { getMinDiffPermutationsGenerator } = require('./permutationsOptimization');
const { createProgressBar, logDeltaTimeAsync } = require('./testUtils');
const { forEachGenerator, mapGenerator, writeGenerator } = require('./generator');

testPermutations(
    createCharSequence('A', 9),
    'output.txt',
    x => x.join('') + '\n'
);

function createCharSequence(startChar, length) {
    const startCharCode = startChar.charCodeAt(0);
    return Array.from({ length }, (_, i) => String.fromCharCode(startCharCode + i));
}

async function testPermutations(set, outputFile, printModifier = defaultPrintModifier) {
    console.log(`input: ${JSON.stringify(set)}`);

    let generator = getMinDiffPermutationsGenerator(set);
    generator = forEachGenerator(generator, createCheckMinDiffPermutations());
    generator = forEachGenerator(generator, createProgressBar(getPermutationsLength(set.length), 30));
    generator = mapGenerator(generator, printModifier);

    try {
        await logDeltaTimeAsync(writeGenerator)(outputFile, generator);
        console.log(`result: ${outputFile}`);
    } catch (error) {
        console.error(`An error occurred while writing to ${outputFile}: ${error}`);
    }
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

function calcListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}
