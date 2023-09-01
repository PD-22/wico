import { writeFileSync } from 'fs';
import { compareDataToFile } from '../../utils/debug.js';
import formatTestResults from './formatTestResults.js';
import validateMinDiffCombination from './validateMinDiffCombination.js';

export default function testCombinations({ outputFile, testInputs, outputCompareFile, getMinDiffCombinationsCallback }) {
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

    if (!outputFile && !outputCompareFile) return testResults;

    const result = formatTestResults(testResults);

    if (outputFile) {
        writeFileSync(outputFile, result);
        console.log(`Results written in: "${outputFile}"`);
    }

    if (outputCompareFile) compareDataToFile(result, outputCompareFile);
}
