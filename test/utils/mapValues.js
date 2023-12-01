import assert from "assert";
import mapValues from "../../utils/mapValues.js";

assert.deepStrictEqual(
    mapValues({ A: 1, B: 2, C: 3 }, (v, k, i) => [v, k, i].join(' ')),
    { "A": "1 A 0", "B": "2 B 1", "C": "3 C 2" }
);

console.log('PASS');
