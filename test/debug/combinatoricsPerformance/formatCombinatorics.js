import assert from "assert";
import formatCombinatorics from "../../../debug/combinatoricsPerformance/formatCombinatorics.js";
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

const output = formatCombinatorics(input);

const expected = `0 1 2
0 2 1
1 2 0
1 0 2
2 0 1
2 1 0

A B C
A C B
B C A
B A C
C B A
C A B`;

simpleAssert(() => assert.strictEqual(output, expected));
