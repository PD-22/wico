const fs = require('fs');
const path = require('path');
const { combineArrays, combineArraysReversedAlternate } = require('./combineArraysReversedAlternate');
const { countListDiff, createCharSequence, zip } = require('./utils');

/*
TODO:
console log short report
write full test report to a file
    for each char sequences:
    input char sequences
    result combinations formatted
    description of at what place what failed
*/

start();

// TODO: extract inputs
function start() {
    const baseDirName = 'combineArraysReversedAlternate';

    if (fs.existsSync(baseDirName)) fs.rmSync(baseDirName, { recursive: true });
    fs.mkdirSync(baseDirName);

    ['Aa', 'Aa1'].flatMap(chars =>
        getCharSequenceVariants(chars.split(''), [2, 3])
    ).forEach((charSequences, inputIndex) => {
        const combinations = combineArraysReversedAlternate(charSequences);

        const formattedCombinations = combinations.map(x => x.join('')).join('\n');

        const fileName = `${inputIndex}.txt`;
        fs.writeFileSync(path.join(baseDirName, fileName), formattedCombinations);

        try {
            validateArrayNeighbours(combinations, (prev, curr) => countListDiff(prev, curr) === 1);
            console.log('Valid adjacent values');
        } catch (error) {
            console.error(`${error.message}. charSequences: ${JSON.stringify(charSequences)}`);
        }
    });

    console.log(`Results written in: "${baseDirName}"`);
}

function getCharSequenceVariants(firstChars, possibleLengths) {
    return combineArrays(
        Array(firstChars.length).fill(possibleLengths)
    ).map(
        lengths => zip(firstChars, lengths).map(args => createCharSequence(...args))
    );
}

function validateArrayNeighbours(array, validateAdjacent) {
    return array.find((curr, i) => {
        if (i && !validateAdjacent(array[i - 1], curr))
            throw new Error(`Invalid adjacent values: i:${i - 1} "${array[i - 1]}" and i:${i} "${curr}"`);
    });
}
