const { range } = require('../utils/general');
const { getCharSequenceVariants, testCombinations } = require('../combinations/utils');
const { getDeltaTime, createProgressBar } = require('../utils/debug');
const { getMinDiffCombinationsOld } = require('./combinationsOldOptimization');
const { getMinDiffCombinations } = require('../combinations/combinationsOptimization');

// list of charSequenceVariants
// charSequenceVariants is an array of chars, where each index holds a set of possible values
const commonRange = range(2, 14);
const testInputs1 = getCharSequenceVariants('Aa'.split(''), commonRange);
const testInputs2 = getCharSequenceVariants('Aa1'.split(''), commonRange);
const testInputs = [...testInputs1, ...testInputs2];

const progressOptions = { total: testInputs.length, width: 40 };

console.log('Measure new combinations method...');
const deltaTimeNew = measureExecutionTime(getMinDiffCombinations);
console.log(`New delta time: ${deltaTimeNew.toFixed(2)}`);

console.log('Measure old combinations method...');
const deltaTimeOld = measureExecutionTime(getMinDiffCombinationsOld);
console.log(`Old delta time: ${deltaTimeOld.toFixed(2)}`);

const total = deltaTimeNew + deltaTimeOld;
console.log(`Total delta time: ${total.toFixed(2)}`);
console.log(`New - old delta time: ${(deltaTimeNew - deltaTimeOld).toFixed(2)}`);

function measureExecutionTime(methodCallback) {
    const progressBar = createProgressBar(progressOptions.total, progressOptions.width);

    const getMinDiffCombinationsCallback = (...args) => {
        progressBar.increment();
        return methodCallback(...args);
    };

    const [deltaTime] = getDeltaTime(() => testCombinations({
        testInputs, getMinDiffCombinationsCallback
    }));

    return deltaTime;
}
