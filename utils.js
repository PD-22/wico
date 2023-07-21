function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function createCharSequence(startChar, length) {
    const startCharCode = startChar.charCodeAt(0);
    return Array.from({ length }, (_, i) => String.fromCharCode(startCharCode + i));
}

function countListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}

function zip(...arrays) {
    const minLength = Math.min(...arrays.map((arr) => arr.length));
    const zipped = [];

    for (let i = 0; i < minLength; i++)
        zipped.push(arrays.map((arr) => arr[i]));

    return zipped;
}

module.exports = {
    factorial,
    createCharSequence,
    countListDiff,
    zip
};
