const fs = require('fs');
const { combineArrays, combineArraysReversedAlternate } = require('./combineArraysReversedAlternate');
const { countListDiff, createCharSequence, zip, countPartition } = require('./utils');

/*
TODO:
maybe add console log short report
extract inputs
refactor result output formatting
*/

start();

function start() {
    const outputFile = 'output.txt';

    // list of charSequenceVariants
    // charSequenceVariants is an array of chars, where each index holds a set of possible values
    const testInputs1 = getCharSequenceVariants('Aa'.split(''), [2, 3]);
    const testInputs2 = getCharSequenceVariants('Aa1'.split(''), [2, 3]);
    const testInputs = [...testInputs1, ...testInputs2];

    const testResults = testInputs.map(testInput => {
        const combinations = combineArraysReversedAlternate(testInput);

        let outputError = null;

        try {
            validateArrayNeighbours(combinations, (prev, curr) => countListDiff(prev, curr) === 1);
        } catch (error) {
            outputError = error;
        }

        return {
            input: testInput,
            output: combinations,
            error: outputError
        };
    });

    const formattedTestResults = testResults.map((testResult, testIndex) => {
        const { input, output, error } = testResult;

        const formattedStatus = error ? "FAIL" : "PASS";
        const formattedOutput = output.map(x => x.join(' ')).join('\n');

        return [
            `Test # ${testIndex + 1}`,
            `Status: ${formattedStatus}`,
            `Input: ${JSON.stringify(input)}`,
            `Output:\n${formattedOutput}`,
            error ? `Error: ${error.message}` : ''
        ].filter(Boolean).join('\n');
    });

    const [passedCount, notPassedCount] = countPartition(testResults, testResult => !testResult.error);

    const formattedStatus = notPassedCount === 0 ? "PASS" : "FAIL";

    const formattedTestSummary = [
        `Status: ${formattedStatus}`,
        `Total Tests: ${testInputs.length}`,
        `Pass: ${passedCount}`,
        `Fail: ${notPassedCount}`,
    ].join('\n');

    const result = `${formattedTestSummary}\n\n${formattedTestResults.join('\n\n')}\n`;

    fs.writeFileSync(outputFile, result);

    console.log(`Results written in: "${outputFile}"`);
}

function getCharSequenceVariants(firstChars, possibleLengths) {
    return combineArrays(
        Array(firstChars.length).fill(possibleLengths)
    ).map(
        lengths => zip(firstChars, lengths).map(args => createCharSequence(...args))
    );
}

function validateArrayNeighbours(array, validateAdjacent) {
    return array.forEach((value, index) => {
        const prevIndex = index - 1;
        const prevValue = array[prevIndex];
        const isInvalid = index && !validateAdjacent(prevValue, value);
        const errorMessage = `Invalid adjacent values ${JSON.stringify(prevValue)} at index ${index} and ${JSON.stringify(value)} at index ${prevIndex}`;
        if (isInvalid) throw new Error(errorMessage);
    });
}
