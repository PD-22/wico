const { product, mapObjectOrArray } = require("../utils/general");

function getCombinations(arrays) {
    return Array.from(getCombinationsGenerator(arrays));
}

function* getCombinationsGenerator(arrays) {
    for (let i = 0; i < getCombinationsLength(arrays); i++)
        yield getCombinationAtIndex(arrays, i);
}

function getCombinationsLength(arrays) {
    return product(Object.values(arrays).map(x => x.length));
}

function getCombinationAtIndex(arrays, index) {
    return mapObjectOrArray(arrays, (currArray, arrayIndex) => {
        const l1 = currArray.length;
        const l2 = product(Object.values(arrays).slice(arrayIndex).map(x => x.length));
        return currArray[Math.floor(l1 / l2 * index) % l1];
    });
}

module.exports = {
    getCombinations,
    getCombinationsLength,
    getCombinationAtIndex
};
