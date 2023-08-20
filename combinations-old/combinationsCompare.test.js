const fs = require('fs');
const { range, compareJSON } = require('../utils/general');
const { getNumSequenceVariants } = require('../combinations/utils');
const { getDeltaTime } = require('../utils/debug');
const { getCombinationsOld } = require('./combinationsOld');
const path = require('path');

const commonRange = range(2, 5);
const testInputs1 = [Array(2).fill(0), commonRange];
const testInputs2 = [Array(3).fill(0), commonRange];
const testInputs = [testInputs1, testInputs2];

console.log('Measure new combinations method...');
const [deltaTimeNew, newCombinationsResult] = getDeltaTime(() => testCharCombinations({ testInputs }));
console.log(`New delta time: ${deltaTimeNew.toFixed(2)}`);

console.log('Measure old combinations method...');
const [deltaTimeOld, oldCombinationsResult] = getDeltaTime(() => testCharCombinations({
    testInputs,
    getCombinationsCallback: getCombinationsOld
}));
console.log(`Old delta time: ${deltaTimeOld.toFixed(2)}`);

const total = deltaTimeNew + deltaTimeOld;
console.log(`Total delta time: ${total.toFixed(2)}`);
const diff = deltaTimeNew - deltaTimeOld;
console.log(`Diff delta time (new - old): ${diff.toFixed(2)}`);
console.log(`Total / diff: ${(100 * diff / total).toFixed(2)}%`);

const outputFile = path.join(__dirname, 'output.txt');
console.log(`Writing results to: "${outputFile}"`);
const resultsMatch = compareJSON(newCombinationsResult, oldCombinationsResult);
if (!resultsMatch) throw new Error('Different results');
const formattedCombinationResults = [newCombinationsResult, oldCombinationsResult].map(
    x => x.map(x => x.map(x => x.join(' ')).join('\n')).join('\n\n')
).join('\n\n\n// // //\n\n\n');
fs.writeFileSync(outputFile, formattedCombinationResults);
console.log('Done');

function testCharCombinations({ testInputs, getCombinationsCallback }) {
    return testInputs.flatMap(testInput => {
        const [firstNums, possibleLengths] = testInput;
        return getNumSequenceVariants(firstNums, possibleLengths, getCombinationsCallback);
    });
}
