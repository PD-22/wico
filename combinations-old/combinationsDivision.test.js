const fs = require('fs');
const { range, deepArrayCompare } = require('../utils/general');
const { getDeltaTime } = require('../utils/debug');
const { getCombinationsOld } = require('./combinationsOld');
const path = require('path');
const { getCombinations } = require('../combinations/combinations');

/*
this is a test for division accuracy bug
2 / 98 * 49 = 0.9999999999999999
2 * 49 / 98 = 1
*/

const start = 1;
const amount = 49;
const inputArrays = [[1, 2], range(start, start + amount - 1)];

const outputFileNewCombinations = path.join(__dirname, 'output-new-combinations.txt');
console.log('Measure new combinations method...');
const [deltaTimeNew, newCombinationsResult] = getDeltaTime(() => getCombinations(inputArrays));
console.log(`New delta time: ${deltaTimeNew.toFixed(2)}`);

const outputFileOldCombinations = path.join(__dirname, 'output-old-combinations.txt');
console.log('Measure old combinations method...');
const [deltaTimeOld, oldCombinationsResult] = getDeltaTime(() => getCombinationsOld(inputArrays));
console.log(`Old delta time: ${deltaTimeOld.toFixed(2)}`);

const total = deltaTimeNew + deltaTimeOld;
console.log(`Total delta time: ${total.toFixed(2)}`);
const diff = deltaTimeNew - deltaTimeOld;
console.log(`Diff delta time (new - old): ${diff.toFixed(2)}`);
console.log(`Total / diff: ${(100 * diff / total).toFixed(2)}%`);


console.log(`Writing results to: "${outputFileOldCombinations}" and "${outputFileNewCombinations}"`);
const resultsMatch = deepArrayCompare(newCombinationsResult, oldCombinationsResult);
resultsMatch ?
    console.log('Combination results match') :
    console.error('Different combination results!');
fs.writeFileSync(outputFileNewCombinations, formatCombinations(newCombinationsResult));
fs.writeFileSync(outputFileOldCombinations, formatCombinations(oldCombinationsResult));
console.log('Done');

function formatCombinations(combinations) {
    return combinations.map(x => x.join(' ')).join('\n')
}
