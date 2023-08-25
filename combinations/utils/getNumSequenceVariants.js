const { getCombinations } = require('../combinations');
const { zip, createNumSequence } = require('../../utils/general');

function getNumSequenceVariants(firstNums, possibleLengths, getCombinationsCallback = getCombinations) {
    const firstNumsLengthCombinations = getCombinationsCallback(
        Array(firstNums.length).fill(possibleLengths)
    );

    const firstNumLengthPairListCombinations = firstNumsLengthCombinations.map(
        firstNumsLength => zip(firstNums, firstNumsLength)
    );

    return firstNumLengthPairListCombinations.map(pairList => pairList.map(([firstNum, length]) => createNumSequence(firstNum, length))
    );
}

module.exports = {
    getNumSequenceVariants
};
