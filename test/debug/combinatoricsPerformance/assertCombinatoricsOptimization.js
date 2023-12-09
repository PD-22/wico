import assert from "assert";
import captureConsole from "../../../debug/captureConsole.js";
import assertCombinatoricsOptimization from "../../../debug/combinatoricsPerformance/assertCombinatoricsOptimization.js";
import simpleAssert from "../../../debug/simpleAssert.js";

const input = [
    [
        [0, 1, 2],
        [0, 2, 1],
        [1, 2, 0],
        [1, 0, 2],
        [2, 0, 1],
        [2, 1, 0]
    ],
    [
        ['A', 'B', 'C'],
        ['A', 'C', 'B'],
        ['B', 'C', 'A'],
        ['B', 'A', 'C'],
        ['C', 'B', 'A'],
        ['C', 'A', 'B']
    ]
];

const [logs] = captureConsole(() =>
    simpleAssert(() => assertCombinatoricsOptimization(input, 2))
);

const expectedLogs = `FAIL: Expected the difference between adjacent items in output (at position 1) to be 2, but got 3.
Item 1: ["B","A","C"] (at position 3)
Item 2: ["C","B","A"] (at position 4).`

simpleAssert(() => assert.strictEqual(logs.join('\n'), expectedLogs));
