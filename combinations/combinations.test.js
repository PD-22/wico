const path = require('path');
const { logDeltaTime } = require('../utils/debug');
const { getCharSequenceVariants, testCombinations } = require('./utils');

// list of charSequenceVariants
// charSequenceVariants is an array of chars, where each index holds a set of possible values
const testInputs1 = getCharSequenceVariants('Aa'.split(''), [2, 3]);
const testInputs2 = getCharSequenceVariants('Aa1'.split(''), [2, 3]);
const testInputs = [...testInputs1, ...testInputs2];

logDeltaTime(testCombinations)({
    testInputs: testInputs,
    outputFile: path.join(__dirname, 'output.txt'),
    outputCompareFile: path.join(__dirname, "output copy.txt")
});
