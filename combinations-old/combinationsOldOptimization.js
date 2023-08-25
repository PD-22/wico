export function getMinDiffCombinationsOld(arrays) {
    const f = Array.isArray(arrays) ?
        getMinDiffCombinationsArray :
        getMinDiffCombinationsObject;
    return f(arrays);
}

function getMinDiffCombinationsArray(arrays) {
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

function getMinDiffCombinationsObject(keyWiringsDict) {
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
