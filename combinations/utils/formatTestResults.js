const { countPartition, findIndices } = require('../../utils/general');

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

module.exports = {
    formatTestResults
};
