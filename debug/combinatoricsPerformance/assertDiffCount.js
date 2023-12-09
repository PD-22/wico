import assert from "assert";
import countListDiff from "../../utils/countListDiff.js";
import forEachAdjacents from "../../utils/forEachAdjacents.js";

/**
 * @param {unknown[][][]} outputList
 * @param {number} expectedDiffCount
 * @throws {AssertionError}
 */
export default function assertDiffCount(outputList, expectedDiffCount) {
    outputList.forEach((output, index) => forEachAdjacents(output, (v1, v2, i1, i2) => {
        const diffCount = countListDiff(v1, v2);

        const errorMessage = `Expected the difference between adjacent items in output ` +
            `(at position ${index}) to be ${expectedDiffCount}, but got ${diffCount}.\n` +
            `Item 1: ${JSON.stringify(v1)} (at position ${i1})\n` +
            `Item 2: ${JSON.stringify(v2)} (at position ${i2}).`;

        assert.strictEqual(diffCount, expectedDiffCount, errorMessage);
    }));
}
