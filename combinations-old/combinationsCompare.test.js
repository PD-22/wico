const fs = require('fs');
const path = require('path');
const { range, } = require('../utils/general');
const { getNumSequenceVariants } = require('../combinations/utils/getNumSequenceVariants');
const { getDeltaTime, comparePerfomance } = require('../utils/debug');
const { getCombinationsOld } = require('./combinationsOld');
const { getCombinations } = require('../combinations/combinations');
const { checkResultsMatch } = require('./utils');

const possibleLengths = range(2, 50);
const testInputs = range(2, 3).map(x => ({ firstNums: Array(x).fill(0), possibleLengths }));

const [deltaTimeNew, newCombinationsResult] = measurePerfomance(getCombinations, testInputs);
const [deltaTimeOld, oldCombinationsResult] = measurePerfomance(getCombinationsOld, testInputs);

comparePerfomance(deltaTimeNew, deltaTimeOld);

checkResultsMatch(newCombinationsResult, oldCombinationsResult);

writeResult(newCombinationsResult, path.join(__dirname, 'output-new-combinations.txt'));
writeResult(oldCombinationsResult, path.join(__dirname, 'output-old-combinations.txt'));

function measurePerfomance(methodCallback, testInputs) {
    console.log(`${methodCallback.name}...`);
    const [deltaTime, result] = getDeltaTime(() =>
        testInputs.flatMap(({ firstNums, possibleLengths }) =>
            getNumSequenceVariants(firstNums, possibleLengths, methodCallback)
        )
    );
    console.log(`${deltaTime.toFixed(2)} ms\n`);

    return [deltaTime, result];
}

function writeResult(result, file) {
    console.log(`Writing to "${file}"...`);
    fs.writeFileSync(file, formatCombinations(result));
    console.log('Done\n');

    function formatCombinations(combinations) {
        return combinations.map(sequence => sequence.map(item => item.join(' ')).join(' | ')).join('\n');
    }
}
