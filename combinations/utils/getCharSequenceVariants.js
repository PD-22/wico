const { getCombinations } = require('../combinations');
const { createCharSequence, zip } = require('../../utils/general');

function getCharSequenceVariants(
    firstChars,
    possibleLengths,
    getCombinationsCallback = getCombinations
) {
    return getCombinationsCallback(
        Array(firstChars.length).fill(possibleLengths)
    ).map(
        lengths => zip(firstChars, lengths).map(args => createCharSequence(...args))
    );
}

module.exports = {
    getCharSequenceVariants,
};
