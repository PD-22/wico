import assert from 'assert';
import captureConsole from '../../../debug/captureConsole.js';
import processCombinatorics from '../../../debug/combinatoricsPerformance/processCombinatorics.js';
import simpleAssert from '../../../debug/simpleAssert.js';
import getMinDiffPermutations from '../../../src/permutationsOptimization.js';

/** @type {(number | string)[][]} */
const input = [[0, 1, 2], ['A', 'B', 'C']];

const [logs, result] = captureConsole(() =>
    processCombinatorics(input, getMinDiffPermutations)
);

const expectedLogs = [
    "getMinDiffPermutations...",
    "\rProgress: [==========          ]",
    "\rProgress: [====================]",
    "\n",
    "0 ms" // NOTE: not used
];

const expectedResult = [
    [
        [0, 1, 2], [0, 2, 1], [1, 2, 0],
        [1, 0, 2], [2, 0, 1], [2, 1, 0]
    ],
    [
        ["A", "B", "C"], ["A", "C", "B"], ["B", "C", "A"],
        ["B", "A", "C"], ["C", "A", "B"], ["C", "B", "A"]
    ]
];

simpleAssert(() => {
    assert.deepStrictEqual(result, expectedResult);

    const lastIndex = logs.length - 1;
    assert.deepStrictEqual(
        expectedLogs.toSpliced(lastIndex),
        logs.toSpliced(lastIndex)
    );

    const ms = String(logs[lastIndex]);
    assert.match(ms, /\d+ ms/);
    assert.ok(parseFloat(ms) >= 0, "ms should be greater than or equal to 0");
});
