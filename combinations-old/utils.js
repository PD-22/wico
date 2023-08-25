const { deepArrayCompare } = require('../utils/general');

function checkResultsMatch(result1, result2) {
    console.log("Testing results...");
    const resultsMatch = deepArrayCompare(result1, result2);
    if (resultsMatch) {
        console.log('Results match\n');
    } else {
        console.error('Different results!\n');
    }
}

module.exports = {
    checkResultsMatch
};
