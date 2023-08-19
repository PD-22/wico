const { range } = require('../utils/general');
const { getCharSequenceVariants, testCombinations } = require('./utils');
const { getDeltaTime } = require('../utils/debug');
const { getMinDiffCombinations: getMinDiffCombinationsOld } = require('./combinationsOldOptimization');

// list of charSequenceVariants
// charSequenceVariants is an array of chars, where each index holds a set of possible values
const commonRange = range(2, 14);
const testInputs1 = getCharSequenceVariants('Aa'.split(''), commonRange);
const testInputs2 = getCharSequenceVariants('Aa1'.split(''), commonRange);
const testInputs = [...testInputs1, ...testInputs2];

console.log('Measure new combinations method...');
const [deltaTimeNew] = getDeltaTime(() => testCombinations({ testInputs: testInputs }));
console.log(`New delta time: ${deltaTimeNew.toFixed(2)}`);

console.log('Measure old combinations method...');
const [deltaTimeOld] = getDeltaTime(() => testCombinations({
    testInputs: testInputs,
    getMinDiffCombinationsCallback: getMinDiffCombinationsOld
}));
console.log(`Old delta time: ${deltaTimeOld.toFixed(2)}`);

const total = deltaTimeNew + deltaTimeOld;
console.log(`Total delta time: ${total}`);
console.log(`New - old delta time: ${(deltaTimeNew - deltaTimeOld).toFixed(2)}`);
