const fs = require('fs');
const { getCombinations } = require('./combinations');
const { countListDiff, createCharSequence, zip, countPartition, findIndices, createNumSequence, mapAdjacents } = require('../utils/general');
const { compareDataToFile } = require('../utils/debug');

class AdjacencyError extends Error {
    constructor(value1, value2, index1, index2) {
        super(`Invalid adjacent values ${value1} at index ${index1} and ${value2} at index ${index2}`);
        this.name = 'AdjacencyError';
    }
}

function testCombinations({ outputFile, testInputs, outputCompareFile, getMinDiffCombinationsCallback }) {
    let testResults = testInputs.map(testInput => {
        const combinations = getMinDiffCombinationsCallback(testInput);
        return { input: testInput, output: combinations };
    });

    testResults = testResults.map(testResult => {
        let outputError = null;

        try {
            validateMinDiffCombination(testResult.output);
        } catch (error) {
            if (!(error instanceof AdjacencyError)) throw error;
            outputError = error;
        }

        return {
            ...testResult,
            error: outputError
        };

    });

    if (!outputFile || !outputCompareFile) return testResults;

    const result = formatTestResults(testResults);

    if (outputFile) {
        fs.writeFileSync(outputFile, result);
        console.log(`Results written in: "${outputFile}"`);
    }

    if (outputCompareFile) compareDataToFile(result, outputCompareFile);
}

function validateMinDiffCombination(combination) {
    mapAdjacents(combination, (value1, value2, index1, index2) => {
        if (countListDiff(value1, value2) === 1) return;
        throw new AdjacencyError(value1, value2, index1, index2);
    })
}

function formatTestResults(testResults) {
    return `${formatTestSummary(testResults)}\n\n${testResults.map(formatTestResultItem).join('\n\n')}\n`;
}

function formatTestSummary(testResults) {
    const isValidTestResult = testResult => !testResult.error;

    const [passedCount, notPassedCount] = countPartition(testResults, isValidTestResult);

    const formattedStatus = notPassedCount === 0 ? "PASS" : "FAIL";

    const failedTestIndices = findIndices(testResults, testResult => !isValidTestResult(testResult));
    const formattedFailedTestIndices = failedTestIndices.map(i => `#${i}`).join(', ');

    const formattedTestSummary = [
        `Total Tests: ${testResults.length}`,
        `Status: ${formattedStatus}`,
        `Pass: ${passedCount}`,
        `Fail: ${notPassedCount}`,
        notPassedCount ? `Failed Tests: ${formattedFailedTestIndices}` : null
    ].filter(x => x !== null).join('\n');
    return formattedTestSummary;
}

function formatTestResultItem(testResult, testIndex) {
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
}

// TODO: make similar to getNumSequenceVariants
function getCharSequenceVariants(
    firstChars,
    possibleLengths,
    getCombinationsCallback = getCombinations
) {
    return getCombinationsCallback(
        Array(firstChars.length).fill(possibleLengths)
    ).map(
        lengths => zip(firstChars, lengths).map(args => createCharSequence(...args))
    );
}

function getNumSequenceVariants(firstNums, possibleLengths, getCombinationsCallback = getCombinations) {
    const firstNumsLengthCombinations = getCombinationsCallback(
        Array(firstNums.length).fill(possibleLengths)
    );

    const firstNumLengthPairListCombinations = firstNumsLengthCombinations.map(
        firstNumsLength => zip(firstNums, firstNumsLength)
    );

    return firstNumLengthPairListCombinations.map(pairList =>
        pairList.map(([firstNum, length]) => createNumSequence(firstNum, length))
    );
}

module.exports = {
    testCombinations,
    getCharSequenceVariants,
    getNumSequenceVariants,
    AdjacencyError,
    validateMinDiffCombination
};
