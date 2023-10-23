export function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

export function createCharSequence(startChar, length) {
    return Array.from({ length }, (_, i) => String.fromCharCode(startChar.charCodeAt(0) + i));
}

export function createNumSequence(startNum, length) {
    return Array.from({ length }, (_, i) => startNum + i);
}

export function countListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}

export function countObjDiff(obj1, obj2) {
    let count = 0;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    for (const key of new Set([...keys1, ...keys2]))
        if (obj1[key] !== obj2[key]) count++;

    return count;
}

export function zip(...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    const zipped = [];

    for (let i = 0; i < maxLength; i++)
        zipped.push(arrays.map(arr => arr[i]));

    return zipped;
}

export function transformObject(obj, callbackfn) {
    return Object.fromEntries(mapObject(obj, callbackfn));
}

export function mapObject(obj, callbackfn) {
    return Object.entries(obj).map(([k, v], i) => callbackfn(v, k, i, obj));
}

export function indent(text, indentation = '  ') {
    return text.replaceAll(
        /(^|\n)(?=.*?\S.*?(\n|$))/g,
        (_match, newline) => (newline ? '\n' : '') + indentation
    );
}

export function lines(...stringList) {
    return stringList.join('\n');
}

export function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr;
}

export function swapImmutable(arr, i, j) {
    return swap(arr.slice(), i, j);
}

export function countPartition(arr, predicate) {
    let passed = 0; let notPassed = 0;
    for (const item of arr) predicate(item) ? passed++ : notPassed++;
    return [passed, notPassed];
}

export function findIndices(array, predicate) {
    return array
        .map((testResult, index) => predicate(testResult) ? index : null)
        .filter(savedIndex => savedIndex !== null);
}

export function compareFileContents(fileContent1, fileContent2) {
    return normalizeEOL(fileContent1) === normalizeEOL(fileContent2);

    function normalizeEOL(str) {
        return str.replace(/\r\n|\r|\n/g, '\n');
    }
}

export function product(numbers) {
    return numbers.reduce((product, number) => product * number, 1);
}

export function indices(length) {
    return range(0, length - 1);
}

export function range(start, end, step) {
    return Array.from(rangeGenerator(start, end, step));
}

export function* rangeGenerator(start, end, step = 1) {
    for (let i = start; i <= end; i += step) yield i;
}

export function mapValues(obj, callback) {
    if (Array.isArray(obj)) return obj.map((value, index) =>
        callback(value, index, index, obj)
    );

    return transformObject(obj, (value, key, index) =>
        [key, callback(value, key, index, obj)]
    );
}

export function mapKeys(obj, callback) {
    return transformObject(obj, (value, key, index) =>
        [callback(value, key, index, obj), value]
    );
}

export function compareJSON(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function deepArrayCompare(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        const item1 = arr1[i];
        const item2 = arr2[i];

        if (Array.isArray(item1) && Array.isArray(item2)) {
            if (!deepArrayCompare(item1, item2)) {
                return false;
            }
        } else if (item1 !== item2) {
            return false;
        }
    }

    return true;
}

export function forEachAdjacents(array, callback) {
    return array.forEach((v2, i2) => {
        if (i2 === 0) return;
        const i1 = i2 - 1;
        const v1 = array[i1];
        return callback(v1, v2, i1, i2, array);
    });
}

export function mapAdjacents(array, callback) {
    const result = Array(array.length - 1);

    forEachAdjacents(array, (v1, v2, i1, i2) => {
        result[i1] = callback(v1, v2, i1, i2, array)
    })

    return result;
}

export function createObject(keys, values) {
    return Object.fromEntries(zip(keys, values));
}
