const { product, indices } = require("./utils");

function getCombinations(arrays) {
    return Array.from(getCombinationsGenerator(arrays));
}

function* getCombinationsGenerator(arrays) {
    for (let i = 0; i < getCombinationsLength(arrays); i++)
        yield getCombinationAtIndex(arrays, i);
}

function getCombinationsLength(arrays) {
    return product(arrays.map(x => x.length));
}

function getCombinationAtIndex(arrays, index) {
    return indices(arrays.length).map(arrayIndex => {
        const currArray = arrays[arrayIndex];
        const l1 = currArray.length;
        const l2 = product(arrays.slice(arrayIndex).map(x => x.length));
        return currArray[Math.floor(l1 / l2 * index) % l1];
    })
}

module.exports = {
    getCombinations,
    getCombinationsLength,
    getCombinationAtIndex
};
