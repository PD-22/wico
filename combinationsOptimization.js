const { getCombinationsLength, getCombinationAtIndex } = require("./combinations");
const { product } = require("./utils");

function getMinDiffCombinations(arrays) {
    return Array.from(getMinDiffCombinationsGenerator(arrays));
}

function* getMinDiffCombinationsGenerator(arrays) {
    for (let i = 0; i < getCombinationsLength(arrays); i++)
        yield getMinDiffCombinationAtIndex(arrays, i);
}

function getMinDiffCombinationAtIndex(arrays, index) {
    const alterReversedArrays = arrays.map((array, i) => {
        if (i <= 0) return array;
        const groupSize = product(arrays.slice(i).map(x => x.length));
        const groupIndex = Math.floor(index / groupSize);
        const shouldReverse = groupIndex % 2 === 1;
        return shouldReverse ? array.toReversed() : array;
    });
    return getCombinationAtIndex(alterReversedArrays, index);
}

module.exports = {
    getMinDiffCombinations,
};
