import assert from "assert";
import countListDiff from "../../utils/countListDiff.js";
import forEachAdjacents from "../../utils/forEachAdjacents.js";

/**
 * @template T
 * @param {T[][][]} outputList
 * @param {number} expectedDiffCount
 * @throws {AssertionError}
 */
export default function assertCombinatoricsOptimization(outputList, expectedDiffCount) {
    outputList.forEach(output => forEachAdjacents(output, (v1, v2) =>
        assert.strictEqual(countListDiff(v1, v2), expectedDiffCount)
    ));
}
