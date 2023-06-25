function calcListDiff(arr1, arr2) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) count++;
    }
    return count;
}

function calcAdjDiff(arr) {
    let result = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        result += calcListDiff(arr[i], arr[i + 1]);
    }
    return result;
}

function generatePermutations(arr) {
    const permutations = [];

    function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function permute(arr, start, end) {
        if (start === end) {
            permutations.push([...arr]);
        } else {
            for (let i = start; i <= end; i++) {
                swap(arr, start, i);
                permute(arr, start + 1, end);
                swap(arr, start, i);
            }
        }
    }

    permute(arr, 0, arr.length - 1);
    return permutations;
}

function mutantFastest(wiring) {
    return generatePermutations(generatePermutations(wiring))
        .map(permutation => ({ permutation, adjDiff: calcAdjDiff(permutation) }))
        .sort((a, b) => a.adjDiff - b.adjDiff);
}

const wiring = ['copper', 'red', 'green'];
const fastestWays = mutantFastest(allPossibleWirings);

console.log(mutantFastest);
