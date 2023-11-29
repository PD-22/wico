import { getDictCombinations } from "./combinations.js";

const combinations = getDictCombinations({ A: [1, 2, 3], B: [10, 20, 30], C: [100, 200, 300] });
console.log(combinations.map(dict => Object.entries(dict).map(entry => entry.join(': ')).join(', ')).join('\n'));
/*
A: 1, B: 10, C: 100
A: 1, B: 10, C: 200
A: 1, B: 10, C: 300
A: 1, B: 20, C: 100
A: 1, B: 20, C: 200
A: 1, B: 20, C: 300
A: 1, B: 30, C: 100
A: 1, B: 30, C: 200
A: 1, B: 30, C: 300
A: 2, B: 10, C: 100
A: 2, B: 10, C: 200
A: 2, B: 10, C: 300
A: 2, B: 20, C: 100
A: 2, B: 20, C: 200
A: 2, B: 20, C: 300
A: 2, B: 30, C: 100
A: 2, B: 30, C: 200
A: 2, B: 30, C: 300
A: 3, B: 10, C: 100
A: 3, B: 10, C: 200
A: 3, B: 10, C: 300
A: 3, B: 20, C: 100
A: 3, B: 20, C: 200
A: 3, B: 20, C: 300
A: 3, B: 30, C: 100
A: 3, B: 30, C: 200
A: 3, B: 30, C: 300
*/
