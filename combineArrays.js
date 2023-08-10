/*
TODO:
maybe add by index generator approach
meassure perfomance, improve
*/

// DUPL: combineArrays and combineArraysAlternate
function combineArrays(arrays) {
    return recursion(arrays.length - 1);

    function recursion(i) {
        if (i === 0) return arrays[i].map(x => [x]);
        return recursion(i - 1).flatMap(x => arrays[i].map(y => [...x, y]));
    }
}

function combineArraysReversedAlternate(arrays) {
    return recursion(arrays.length - 1);

    function recursion(i) {
        if (i === 0) return arrays[i].map(x => [x]);

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
        const [key, wirings] = keyWiringsEntries[i];

        if (i === 0) return wirings.map(wiring => ({ [key]: wiring }));

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
