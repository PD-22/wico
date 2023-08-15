const { product, indices } = require("./utils");

function combineArrays(arrays) {
    const resultLength = product(arrays.map(x => x.length));
    return indices(resultLength).map(i => indices(arrays.length).map(j => {
        const currArray = arrays[j];
        const l1 = currArray.length;
        const l2 = product(arrays.slice(j).map(x => x.length));
        return currArray[Math.floor(l1 / l2 * i) % l1];
    }));
}

function combineArraysReversedAlternate(arrays) {
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

function combineArraysWithKeysReversedAlternate(keyWiringsDict) {
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
    combineArrays,
    combineArraysReversedAlternate,
    combineArraysWithKeysReversedAlternate
};
