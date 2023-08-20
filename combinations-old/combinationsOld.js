function getCombinationsOld(arrays) {
    return recursion(arrays.length - 1);

    function recursion(i) {
        if (i < 0) return [[]];

        return recursion(i - 1).flatMap(x =>
            arrays[i].map(y => [...x, y])
        );
    }
}

module.exports = {
    getCombinationsOld
};
