const fs = require('fs');
const path = require('path');
const { range, deepArrayCompare } = require('../utils/general');
const { getCombinationsOld } = require('./combinationsOld');
const { getCombinations } = require('../combinations/combinations');

/*
this is a test for division accuracy bug
2 / 98 * 49 = 0.9999999999999999
2 * 49 / 98 = 1
*/

const start = 1;
const amount = 49;
const testInputs = [[1, 2], range(start, start + amount - 1)];

const newCombinationsResult = getCombinations(testInputs);
const oldCombinationsResult = getCombinationsOld(testInputs);

checkResultsMatch(newCombinationsResult, oldCombinationsResult)

writeResult(newCombinationsResult, path.join(__dirname, 'output-new-combinations.txt'));
writeResult(oldCombinationsResult, path.join(__dirname, 'output-old-combinations.txt'));

function checkResultsMatch(newCombinationsResult, oldCombinationsResult) {
    console.log("Testing results...");
    const resultsMatch = deepArrayCompare(newCombinationsResult, oldCombinationsResult);
    if (resultsMatch) {
        console.log('Combination results match\n');
    } else {
        console.error('Different combination results!\n');
    }
}

function writeResult(result, file) {
    console.log(`Writing to "${file}"...`);
    fs.writeFileSync(file, formatCombinations(result));
    console.log('Done\n');

    function formatCombinations(combinations) {
        return combinations.map(x => x.join(' ')).join('\n')
    }
}
