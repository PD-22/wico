import { getMinDiffDictCombinations } from "./combinationsOptimization.js";

const combinations = getMinDiffDictCombinations({ A: [1, 2, 3], B: [10, 20, 30], C: [100, 200, 300] });
console.log(combinations.map(dict => Object.entries(dict).map(entry => entry.join(': ')).join(', ')).join('\n'));
/*
Z: 1, X: a, Y: A
Z: 1, X: a, Y: B
Z: 1, X: a, Y: C
Z: 1, X: b, Y: C
Z: 1, X: b, Y: B
Z: 1, X: b, Y: A
Z: 1, X: c, Y: A
Z: 1, X: c, Y: B
Z: 1, X: c, Y: C
Z: 2, X: c, Y: C
Z: 2, X: c, Y: B
Z: 2, X: c, Y: A
Z: 2, X: b, Y: A
Z: 2, X: b, Y: B
Z: 2, X: b, Y: C
Z: 2, X: a, Y: C
Z: 2, X: a, Y: B
Z: 2, X: a, Y: A
Z: 3, X: a, Y: A
Z: 3, X: a, Y: B
Z: 3, X: a, Y: C
Z: 3, X: b, Y: C
Z: 3, X: b, Y: B
Z: 3, X: b, Y: A
Z: 3, X: c, Y: A
Z: 3, X: c, Y: B
Z: 3, X: c, Y: C
*/
// difference between every adjacent combination is only 1
