const path = require('path');
const { logDeltaTime } = require('../utils/debug');
const { getCharSequenceVariants } = require('./utils/getCharSequenceVariants');
const { testCombinations } = require('./utils/testCombinations');
const { getMinDiffCombinations } = require('./combinationsOptimization');

logDeltaTime(testCombinations)({
    testInputs: [
        ...getCharSequenceVariants('Aa'.split(''), [2, 3]),
        ...getCharSequenceVariants('Aa1'.split(''), [2, 3])
    ],
    outputFile: path.join(__dirname, 'output.txt'),
    outputCompareFile: path.join(__dirname, "output copy.txt"),
    getMinDiffCombinationsCallback: getMinDiffCombinations
});
