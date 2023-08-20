const fs = require('fs');
const { range, deepArrayCompare } = require('../utils/general');
const { getNumSequenceVariants } = require('../combinations/utils');
const { getDeltaTime } = require('../utils/debug');
const { getCombinationsOld } = require('./combinationsOld');
const path = require('path');

const commonRange = range(2, 50);
const testInputs1 = [Array(2).fill(0), commonRange];
const testInputs2 = [Array(3).fill(0), commonRange];
const testInputs = [testInputs1, testInputs2];

const outputFileNewCombinations = path.join(__dirname, 'output-new-combinations.txt');
console.log('Measure new combinations method...');
const [deltaTimeNew, newCombinationsResult] = getDeltaTime(() => testCharCombinations(testInputs));
console.log(`New delta time: ${deltaTimeNew.toFixed(2)}`);

const outputFileOldCombinations = path.join(__dirname, 'output-old-combinations.txt');
console.log('Measure old combinations method...');
const [deltaTimeOld, oldCombinationsResult] = getDeltaTime(() => testCharCombinations(testInputs, getCombinationsOld));
console.log(`Old delta time: ${deltaTimeOld.toFixed(2)}`);

const total = deltaTimeNew + deltaTimeOld;
console.log(`Total delta time: ${total.toFixed(2)}`);
const diff = deltaTimeNew - deltaTimeOld;
console.log(`Diff delta time (new - old): ${diff.toFixed(2)}`);
console.log(`Total / diff: ${(100 * diff / total).toFixed(2)}%`);


console.log(`Writing results to: "${outputFileOldCombinations}" and "${outputFileNewCombinations}"`);
const resultsMatch = deepArrayCompare(newCombinationsResult, oldCombinationsResult);
if (!resultsMatch) console.error('Different combination results!');
fs.writeFileSync(outputFileNewCombinations, formatCombinations(newCombinationsResult));
fs.writeFileSync(outputFileOldCombinations, formatCombinations(oldCombinationsResult));
console.log('Done');

function testCharCombinations(testInputs, getCombinationsCallback) {
    return testInputs.flatMap(testInput => {
        const [firstNums, possibleLengths] = testInput;
        return getNumSequenceVariants(firstNums, possibleLengths, getCombinationsCallback);
    });
}

function formatCombinations(combinations) {
    return combinations.map(x => x.map(x => x.join(' ')).join(' | ')).join('\n')
}
