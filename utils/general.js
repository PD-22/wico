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

function countObjDiff(obj1, obj2) {
    let count = 0;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (const key of new Set([...keys1, ...keys2]))
        if (obj1[key] !== obj2[key]) count++;

    return count;
}

function zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    const zipped = [];

    for (let i = 0; i < maxLength; i++)
        zipped.push(arrays.map(arr => arr[i]));

    return zipped;
}

function transformObject(obj, callbackfn) {
    return Object.fromEntries(mapObject(obj, callbackfn));
}

function mapObject(obj, callbackfn) {
    return Object.entries(obj).map(([k, v], i) => callbackfn(k, v, i));
}

function indentText(text, indentation) {
    return text.replaceAll(
        /(^|\n)(?=.*?\S.*?(\n|$))/g,
        (_match, newline) => (newline ? '\n' : '') + indentation
    );
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
}

function swapImmutable(arr, i, j) {
    return swap(arr.slice(), i, j);
}

function countPartition(arr, predicate) {
    let passed = 0; let notPassed = 0;
    for (const item of arr) predicate(item) ? passed++ : notPassed++;
    return [passed, notPassed];
}

function findIndices(array, predicate) {
    return array
        .map((testResult, index) => predicate(testResult) ? index : null)
        .filter(savedIndex => savedIndex !== null);
}

function compareFileContents(fileContent1, fileContent2) {
    return normalizeEOL(fileContent1) === normalizeEOL(fileContent2);

    function normalizeEOL(str) {
        return str.replace(/\r\n|\r|\n/g, '\n');
    }
}

function product(numbers) {
    return numbers.reduce((product, number) => product * number, 1);
}

function indices(length) {
    return range(0, length - 1);
}

function range(start, end, step = 1) {
    return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) => start + i * step);
}

function mapObjectOrArray(obj, callback) {
    if (Array.isArray(obj)) return obj.map((value, index) =>
        callback(value, index, index)
    );

    return transformObject(obj, (key, value, index) =>
        [key, callback(value, index, key)]
    );
}

module.exports = {
    factorial,
    createCharSequence,
    countListDiff,
    countObjDiff,
    zip,
    transformObject,
    mapObject,
    indentText,
    swap,
    swapImmutable,
    countPartition,
    findIndices,
    compareFileContents,
    product,
    indices,
    range,
    mapObjectOrArray
};