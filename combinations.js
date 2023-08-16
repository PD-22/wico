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

function getMinDiffCombinations(arrays) {
    return recursion(arrays.length - 1);

    function recursion(i) {
        if (i < 0) return [[]];

        return recursion(i - 1).flatMap((x, j) =>
            (j % 2 === 1 ?
                arrays[i].toReversed() :
                arrays[i]
            ).map(y => [...x, y])
        );
    }
}

function getMinDiffDictCombinations(keyWiringsDict) {
    const keyWiringsEntries = Object.entries(keyWiringsDict);

    return recursion(keyWiringsEntries.length - 1);

    function recursion(i) {
        if (i < 0) return [{}];

        return recursion(i - 1).flatMap((x, j) => {
            const [key, wirings] = keyWiringsEntries[i];

            const wiringsAlter = j % 2 === 1 ?
                wirings.toReversed() :
                wirings;

            return wiringsAlter.map(wiring => ({ ...x, [key]: wiring }));
        });
    }
}

module.exports = {
    getCombinations,
    getMinDiffCombinations,
    getMinDiffDictCombinations
};
