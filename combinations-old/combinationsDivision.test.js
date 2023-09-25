import { writeFileSync } from "fs";
import { join } from "path";
import { getCombinations } from "../combinations/combinations.js";
import { getDirname } from "../utils/debug.js";
import { range } from "../utils/general.js";
import getCombinationsOld from "./combinationsOld.js";
import checkResultsMatch from "./utils.js";

const DIRNAME = getDirname(import.meta.url);

/* NOTE: test for division accuracy bug
2 / 98 * 49 = 0.9999999999999999
2 * 49 / 98 = 1
*/

const start = 1;
const amount = 49;
const testInputs = [[1, 2], range(start, start + amount - 1)];

const newCombinationsResult = getCombinations(testInputs);
const oldCombinationsResult = getCombinationsOld(testInputs);

checkResultsMatch(newCombinationsResult, oldCombinationsResult)

writeResult(newCombinationsResult, join(DIRNAME, 'output-new-combinations.txt'));
writeResult(oldCombinationsResult, join(DIRNAME, 'output-old-combinations.txt'));

function writeResult(result, file) {
    console.log(`Writing to "${file}"...`);
    writeFileSync(file, formatCombinations(result));
    console.log('Done\n');

    function formatCombinations(combinations) {
        return combinations.map(x => x.join(' ')).join('\n')
    }
}
