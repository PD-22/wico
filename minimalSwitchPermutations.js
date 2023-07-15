const fs = require('fs');
const { Readable } = require('stream');
const readline = require('readline');

const letters = generateCharSequence('A', 9);
// testPermutations(letters);
writePermutations(letters, 'output.txt', x => x.join('') + '\n');

function testPermutations(input) {
    console.log(`input: ${JSON.stringify(input)}`);

    const permutationsList = logDeltaTime(getMinDiffPermutations)(input);
    const success = logDeltaTime(checkMinDiffPermutations)(permutationsList);

    console.log(`result: ${success}`);
}

async function writePermutations(set, outputFile, printModifier) {
    console.log(`input: ${JSON.stringify(set)}`);

    const permutationGenerator = getMinDiffPermutationsGenerator(set);
    const printGenerator = mapGenerator(permutationGenerator, printModifier || defaultPrintModifier);

    try {
        await logDeltaTimeAsync(writeGeneratorWithPermutationTest)(outputFile, printGenerator);
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

async function writeGeneratorWithPermutationTest(outputFile, generator) {
    const readable = Readable.from(generator);
    const writeStream = fs.createWriteStream(outputFile);

    const rl = readline.createInterface({ input: readable, output: writeStream });

    return new Promise((resolve, reject) => {
        let prevLine = undefined;
        rl.on('line', (line) => {
            const isValidLine = !prevLine || calcListDiff(prevLine, line) === 2;
            prevLine = line;

            if (!isValidLine) {
                rl.close();
                const error = new Error('Invalid line encountered');
                reject(error);
                throw error;
            }

            writeStream.write(line + '\n');
        });

        rl.on('close', () => {
            writeStream.end();
            resolve();
        });

        rl.once('error', reject);
    });
}

function generateCharSequence(startChar, length) {
    const startCharCode = startChar.charCodeAt(0);
    return Array.from({ length }, (_, i) => String.fromCharCode(startCharCode + i));
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

function getMinDiffPermutations(set) {
    return Array.from(getMinDiffPermutationsGenerator(set));
}

function* getMinDiffPermutationsGenerator(set) {
    for (let i = 0; i < factorial(set.length); i++)
        yield getMinDiffPermutationAtIndex(set, i);
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function getMinDiffPermutationAtIndex(set, index) {
    const minDiffPermutationSwapIndex = getMinDiffPermutationSwapIndex(set.length, index);
    return getPermutationAtIndex(set, minDiffPermutationSwapIndex);
}

function getMinDiffPermutationSwapIndex(length, index) {
    if (index < 0 || index >= factorial(length)) throw new RangeError();

    let height = factorial(length) / length--;
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

function getPermutationAtIndex(set, index) {
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

function checkMinDiffPermutations(permutationsList) {
    return permutationsList.every(hasMinAdjacencyDiff);

    function hasMinAdjacencyDiff(permutation, index) {
        const nextPermutation = permutationsList[index + 1];
        if (!nextPermutation) return true;
        return calcListDiff(permutation, nextPermutation) === 2;
    }
}

function calcListDiff(arr1, arr2) {
    let count = 0;
    const maxLength = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < maxLength; i++)
        if (arr1[i] !== arr2[i]) count++;
    return count;
}
