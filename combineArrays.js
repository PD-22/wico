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

module.exports = {
    combineArrays,
    combineArraysReversedAlternate
};
