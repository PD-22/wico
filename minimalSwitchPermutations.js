const fs = require('fs');
const { Readable } = require('stream');

// testPermutations(lettersArray(9));
writePermutations(lettersArray(9), 'output.txt', x => x.join('') + '\n');

function testPermutations(input) {
    console.log(`input: ${JSON.stringify(input)}`); ``
    const permutationsList = logDeltaTime(minimalSwitchPermutations)(input);
    const success = logDeltaTime(checkMinimalSwitchPermutations)(permutationsList);
    console.log(`success: ${success}`);
}

async function writePermutations(set, outputFile, modifier = x => JSON.stringify(x) + '\n') {
    console.log(`Generating optimized permutations of ${JSON.stringify(set)}`);
    try {
        const startTime = performance.now();
        await writeGenerator(outputFile, minimalSwitchPermutationsGenerator(set, modifier));
        const deltaTimeMs = Math.floor(performance.now() - startTime);
        console.log(`Done in ${deltaTimeMs} ms`);
        console.log(`Output written to "${outputFile}"`);
    } catch (error) {
        console.error(`An error occurred while writing to ${outputFile}: ${error}`);
    }
}

async function writeGenerator(outputFile, generator) {
    const writeStream = fs.createWriteStream(outputFile);
    const readable = Readable.from(generator);

    return new Promise((resolve, reject) => {
        readable.pipe(writeStream);

        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });
}

function lettersArray(num) {
    const minCharCode = 'A'.charCodeAt(0);
    const maxCharCode = 'Z'.charCodeAt(0)
    const maxNum = maxCharCode - minCharCode;
    if (!(0 <= num && num <= maxNum + 1)) throw new RangeError();
    return Array(num).fill().map((_, i) => String.fromCharCode(minCharCode + i));
}

function logDeltaTime(callback) {
    return (...args) => {
        console.log(`${callback.name}...`);
        const [result, deltaTime] = getDeltaTime(() => callback(...args));
        console.log(`${callback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

function getDeltaTime(callback) {
    const startTime = performance.now();
    const result = callback();
    const endTime = performance.now();
    const deltaTime = endTime - startTime;
    return [result, deltaTime];
}

function minimalSwitchPermutations(set) {
    return Array.from(minimalSwitchPermutationsGenerator(set));
}

function* minimalSwitchPermutationsGenerator(set, modifier = x => x) {
    for (let index = 0; index < factorial(set.length); index++)
        yield modifier(minimalSwitchPermutationItem(set, index));
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function minimalSwitchPermutationItem(set, index) {
    const permutationItemIndex = minimalSwitchPermutationItemIndex(set.length, index);
    return permutationItem(set, permutationItemIndex);
}

function minimalSwitchPermutationItemIndex(width, index) {
    if (index < 0 || index >= factorial(width)) throw new RangeError();

    let height = factorial(width) / width--;
    let offset = 0;

    while (width > 1) {
        const leftover = Math.floor(index / height);
        const odd = leftover % 2 === 1;
        offset += leftover * height;
        index %= height;
        if (odd) index = height - index - 1;
        height /= width--;
    }

    return index + offset;
}

function permutationItem(set, index) {
    if (index < 0 || index >= factorial(set.length)) throw new RangeError();

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

function checkMinimalSwitchPermutations(arr) {
    const diff = listDiffSum(arr);
    const minDiff = getMinDiff(arr[0].length);
    return diff === minDiff;

    function getMinDiff(length) {
        return 2 * (factorial(length) - 1);
    }

    function calcListDiff(arr1, arr2) {
        let count = 0;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) count++;
        }
        return count;
    }

    function listDiffSum(list) {
        return list.reduce((acc, curr, index, arr) => {
            const next = arr[index + 1];
            const diff = next ? calcListDiff(curr, next) : 0;
            return acc + diff;
        }, 0)
    }
}
