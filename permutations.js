const { factorial } = require("./math");

function getPermutations(set) {
    return Array.from(getPermutationsGenerator(set));
}

function* getPermutationsGenerator(set) {
    for (let i = 0; i < getPermutationsLength(set.length); i++)
        yield getPermutationAtIndex(set, i);
}

function getPermutationsLength(setLength) {
    return factorial(setLength);
}

function getPermutationAtIndex(set, index) {
    if (index < 0 || index >= getPermutationsLength(set.length)) throw new RangeError();

    let remainingSet = set.slice();
    let result = [];

    for (let i = set.length - 1; i >= 0; i--) {
        const quotient = Math.floor(index / factorial(i));

        result.push(remainingSet[quotient]);
        remainingSet.splice(quotient, 1);

        index %= factorial(i);
    }

    return result;
}

module.exports = {
    getPermutations,
    getPermutationsGenerator,
    getPermutationsLength,
    getPermutationAtIndex
};
