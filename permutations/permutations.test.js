const { getPermutationsLength } = require('./permutations');
const { getMinDiffPermutationsGenerator } = require('./permutationsOptimization');
const { createProgressBar, logDeltaTimeAsync } = require('../utils/debug');
const { writeGenerator, enrichGenerator } = require('../utils/generator');
const { createCharSequence, countListDiff } = require("../utils/general");
const path = require('path');

testPermutations(
    createCharSequence('A', 9),
    path.join(__dirname, 'output.txt'),
    x => x.join('') + '\n'
);

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
        const isInvalid = prevValue && countListDiff(prevValue, value) !== 2;
        if (isInvalid) throw new Error('Invalid adjacent permutations encountered');
        prevValue = value;
    }
}