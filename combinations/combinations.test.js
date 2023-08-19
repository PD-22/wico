const fs = require('fs');
const { getCombinations } = require('./combinations');
const { getMinDiffCombinations } = require('./combinationsOptimization');
const { countListDiff, createCharSequence, zip, countPartition, findIndices, compareFileContents, range } = require('../utils/general');
const path = require('path');
const { compareDataToFile, logDeltaTime } = require('../utils/debug');

class AdjacencyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AdjacencyError';
    }
}

// list of charSequenceVariants
// charSequenceVariants is an array of chars, where each index holds a set of possible values
const testInputs1 = getCharSequenceVariants('Aa'.split(''), [2, 3]);
const testInputs2 = getCharSequenceVariants('Aa1'.split(''), [2, 3]);
const testInputs = [...testInputs1, ...testInputs2];

logDeltaTime(testCombinations)({
    testInputs: testInputs,
    outputFile: path.join(__dirname, 'output.txt'),
    outputCompareFile: path.join(__dirname, "output copy.txt")
});

function testCombinations({ testInputs, outputFile, outputCompareFile }) {
    // add output
    let testResults = testInputs.map(testInput => {
        const combinations = getMinDiffCombinations(testInput);
        return { input: testInput, output: combinations };
    });

    // add error
    testResults = testResults.map(testResult => {
        let outputError = null;

        try {
            validateArrayNeighbours(testResult.output, (prev, curr) => countListDiff(prev, curr) === 1);
        } catch (error) {
            if (!(error instanceof AdjacencyError)) throw error;
            outputError = error;
        }

        return {
            ...testResult,
            error: outputError
        };

    });

    const formattedTestResults = testResults.map((testResult, testIndex) => {
        const { input, output, error } = testResult;

        const formattedStatus = error ? "FAIL" : "PASS";
        const formattedOutput = output.map(x => x.join(' ')).join('\n');

        return [
            `Test #${testIndex}`,
            `Status: ${formattedStatus}`,
            `Input: ${JSON.stringify(input)}`,
            `Output:\n${formattedOutput}`,
            error ? `Error: ${error.message}` : null
        ].filter(x => x !== null).join('\n');
    });

    const isValidTestResult = testResult => !testResult.error;

    const [passedCount, notPassedCount] = countPartition(testResults, isValidTestResult);

    const formattedStatus = notPassedCount === 0 ? "PASS" : "FAIL";

    const failedTestIndices = findIndices(testResults, testResult => !isValidTestResult(testResult));
    const formattedFailedTestIndices = failedTestIndices.map(i => `#${i}`).join(', ');

    const formattedTestSummary = [
        `Total Tests: ${testInputs.length}`,
        `Status: ${formattedStatus}`,
        `Pass: ${passedCount}`,
        `Fail: ${notPassedCount}`,
        notPassedCount ? `Failed Tests: ${formattedFailedTestIndices}` : null
    ].filter(x => x !== null).join('\n');

    const result = `${formattedTestSummary}\n\n${formattedTestResults.join('\n\n')}\n`;

    if (outputFile) {
        fs.writeFileSync(outputFile, result);
        console.log(`Results written in: "${outputFile}"`);
    }

    if (outputCompareFile) compareDataToFile(result, outputCompareFile);
}

function getCharSequenceVariants(firstChars, possibleLengths) {
    return getCombinations(
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
        if (isInvalid) throw new AdjacencyError(errorMessage);
    });
}
