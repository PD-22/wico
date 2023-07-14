const fs = require('fs');
const { Readable } = require('stream');

// testPermutations(lettersArray(9));
writePermutations(lettersArray(9), 'output.txt', x => x.join('') + '\n');

function testPermutations(input) {
    console.log(`input: ${JSON.stringify(input)}`); ``
    const permutationsList = logDeltaTime(minSwitchPermutations)(input);
    const success = logDeltaTime(checkMinSwitchPermutations)(permutationsList);
    console.log(`result: ${success}`);
}

async function writePermutations(set, outputFile, printModifier) {
    console.log(`input: ${JSON.stringify(set)}`);
    const generator = minSwitchPermutationsGenerator(set);
    const printGenerator = mapGenerator(generator, printModifier || defaultPrintModifier);

    try {
        await logDeltaTimeAsync(writeGenerator)(outputFile, printGenerator);
        console.log(`result: ${outputFile}`);
    } catch (error) {
        console.error(`An error occurred while writing to ${outputFile}: ${error}`);
    }

    function defaultPrintModifier(value) {
        return value.join(' ') + '\n';
    }
}

function* mapGenerator(generator, callbackfn) {
    for (const value of generator) yield callbackfn(value);
};

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
        const [deltaTime, result] = getDeltaTime(callback.bind(null, ...args));
        console.log(`${callback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

function getDeltaTime(callback) {
    const startTime = performance.now();
    const result = callback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

function logDeltaTimeAsync(asyncCallback) {
    return async (...args) => {
        console.log(`${asyncCallback.name}...`);
        const [deltaTime, result] = await getDeltaTimeAsync(asyncCallback.bind(null, ...args));
        console.log(`${asyncCallback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };
}

async function getDeltaTimeAsync(asyncCallback) {
    const startTime = performance.now();
    const result = await asyncCallback();
    const deltaTime = performance.now() - startTime;
    return [deltaTime, result];
}

function minSwitchPermutations(set) {
    return Array.from(minSwitchPermutationsGenerator(set));
}

function* minSwitchPermutationsGenerator(set) {
    for (let i = 0; i < factorial(set.length); i++)
        yield minSwitchPermutationItem(set, i);
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function minSwitchPermutationItem(set, index) {
    const permutationItemIndex = minSwitchPermutationItemIndex(set.length, index);
    return permutationItem(set, permutationItemIndex);
}

function minSwitchPermutationItemIndex(width, index) {
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

function checkMinSwitchPermutations(arr) {
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
