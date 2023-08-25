const { range } = require('../utils/general');
const { getCharSequenceVariants, validateMinDiffCombination } = require('../combinations/utils');
const { getMinDiffCombinationsOld } = require('./combinationsOldOptimization');
const { getMinDiffCombinations } = require('../combinations/combinationsOptimization');
const { createProgressBar, getDeltaTime, comparePerfomance } = require('../utils/debug');
const { checkResultsMatch } = require('./utils');

const commonRange = range(2, 14);
const testInputs1 = getCharSequenceVariants('Aa'.split(''), commonRange);
const testInputs2 = getCharSequenceVariants('Aa1'.split(''), commonRange);
const testInputs = [...testInputs1, ...testInputs2];

const [deltaTimeNew, resultNew] = measurePerfomance(getMinDiffCombinations, testInputs);
validateMinDiffCombinations(resultNew);

const [deltaTimeOld, resultOld] = measurePerfomance(getMinDiffCombinationsOld, testInputs);
validateMinDiffCombinations(resultOld);

checkResultsMatch(resultNew, resultOld);

comparePerfomance(deltaTimeNew, deltaTimeOld);

function measurePerfomance(methodCallback, testInputs) {
    const progressBar = createProgressBar(testInputs.length, 40);

    console.log(`${methodCallback.name}...`);
    const [deltaTime, result] = getDeltaTime(() =>
        testInputs.map(testInput => {
            progressBar.increment();
            return methodCallback(testInput);
        })
    );
    console.log(`${deltaTime.toFixed(2)} ms`);

    return [deltaTime, result];
}

function validateMinDiffCombinations(combinations) {
    console.log("Validating combinations...");
    combinations.forEach(combination => validateMinDiffCombination(combination));
    console.log("Valid\n");
}
