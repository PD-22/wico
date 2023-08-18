const { getCombinationsLength, getCombinationAtIndex } = require("./combinations");
const { product, mapObjectOrArray } = require("../utils/general");

function getMinDiffCombinations(arrays) {
    return Array.from(getMinDiffCombinationsGenerator(arrays));
}

function* getMinDiffCombinationsGenerator(arrays) {
    for (let i = 0; i < getCombinationsLength(arrays); i++)
        yield getMinDiffCombinationAtIndex(arrays, i);
}

function getMinDiffCombinationAtIndex(arrays, index) {
    const alterReversedArrays = mapObjectOrArray(arrays, (array, i) => {
        if (i <= 0) return array;
        const groupSize = product(Object.values(arrays).slice(i).map(x => x.length));
        const groupIndex = Math.floor(index / groupSize);
        const shouldReverse = groupIndex % 2 === 1;
        return shouldReverse ? array.toReversed() : array;
    });
    return getCombinationAtIndex(alterReversedArrays, index);
}

module.exports = {
    getMinDiffCombinations,
};
