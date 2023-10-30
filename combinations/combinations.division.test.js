import { writeFileSync } from "fs";
import { join } from "path";
import getDirname from "../debug/getDirname.js";
import deepArrayCompare from "../utils/deepArrayCompare.js";
import range from "../utils/range.js";
import getCombinations from "./combinations.js";

/* NOTE: test for division accuracy bug
2 / 98 * 49 = 0.9999999999999999
2 * 49 / 98 = 1
*/

const DIRNAME = getDirname(import.meta.url);

const testInput = [[1, 2], range(1, 49)];
const correctResult = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 16], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21], [1, 22], [1, 23], [1, 24], [1, 25], [1, 26], [1, 27], [1, 28], [1, 29], [1, 30], [1, 31], [1, 32], [1, 33], [1, 34], [1, 35], [1, 36], [1, 37], [1, 38], [1, 39], [1, 40], [1, 41], [1, 42], [1, 43], [1, 44], [1, 45], [1, 46], [1, 47], [1, 48], [1, 49], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13], [2, 14], [2, 15], [2, 16], [2, 17], [2, 18], [2, 19], [2, 20], [2, 21], [2, 22], [2, 23], [2, 24], [2, 25], [2, 26], [2, 27], [2, 28], [2, 29], [2, 30], [2, 31], [2, 32], [2, 33], [2, 34], [2, 35], [2, 36], [2, 37], [2, 38], [2, 39], [2, 40], [2, 41], [2, 42], [2, 43], [2, 44], [2, 45], [2, 46], [2, 47], [2, 48], [2, 49]];

const result = getCombinations(testInput);

console.log("Results match...");
const resultsMatch = deepArrayCompare(result, correctResult);
console.log(`${resultsMatch}\n`);

const outputFile = join(DIRNAME, 'output.txt');
writeFileSync(outputFile, result.map(x => x.join(' ')).join('\n'));
console.log(`Output written to "${outputFile}"`);
