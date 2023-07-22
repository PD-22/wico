const { getPermutationsLength, getPermutationAtIndex } = require("./permutations");

function getMinDiffPermutations(set) {
    return Array.from(getMinDiffPermutationsGenerator(set));
}

function* getMinDiffPermutationsGenerator(set) {
    for (let i = 0; i < getPermutationsLength(set.length); i++)
        yield getMinDiffPermutationAtIndex(set, i);
}

function getMinDiffPermutationAtIndex(set, index) {
    const minDiffPermutationSwapIndex = getMinDiffPermutationSwapIndex(set.length, index);
    return getPermutationAtIndex(set, minDiffPermutationSwapIndex);
}

function getMinDiffPermutationSwapIndex(length, index) {
    const permutationsLength = getPermutationsLength(length);

    if (index < 0 || index >= permutationsLength) throw new RangeError();

    let height = permutationsLength / length--;
    let offset = 0;

    while (length > 1) {
        const leftover = Math.floor(index / height);
        const isOdd = leftover % 2 === 1;
        offset += leftover * height;
        index %= height;
        if (isOdd) index = height - index - 1;
        height /= length--;
    }

    return index + offset;
}

module.exports = {
    getMinDiffPermutations,
    getMinDiffPermutationsGenerator,
    getMinDiffPermutationAtIndex,
    getMinDiffPermutationSwapIndex
};
