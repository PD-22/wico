const { getPermutationsLength } = require('./permutations');
const { getMinDiffPermutationsGenerator } = require('./permutationsOptimization');
const { createProgressBar, logDeltaTimeAsync } = require('./testUtils');
const { writeGenerator, enrichGenerator } = require('./generator');

testPermutations(
    createCharSequence('A', 9),
    'output.txt',
    x => x.join('') + '\n'
);

function createCharSequence(startChar, length) {
    const startCharCode = startChar.charCodeAt(0);
    return Array.from({ length }, (_, i) => String.fromCharCode(startCharCode + i));
}

async function testPermutations(set, outputFile, formatEntry = x => x.join(' ') + '\n') {
    console.log(`input: ${JSON.stringify(set)}`);

    const generator = enrichGenerator(getMinDiffPermutationsGenerator(set))
        .forEach(createCheckMinDiffPermutations())
        .forEach(createProgressBar(getPermutationsLength(set.length), 30).increment)
        .map(formatEntry);

    try {
        await logDeltaTimeAsync(writeGenerator)(outputFile, generator);
        console.log(`result: ${outputFile}`);
    } catch (error) {
        console.error(`An error occurred while writing to ${outputFile}: ${error}`);
    }
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
