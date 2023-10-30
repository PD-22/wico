import { getDictCombinations } from "./combinations.js";

const combinations = getDictCombinations({ Z: [1, 2, 3], X: ['a', 'b', 'c'], Y: ['A', 'B', 'C'] });
console.log(combinations.map(dict => Object.entries(dict).map(entry => entry.join(': ')).join(', ')).join('\n'));
/*
Z: 1, X: a, Y: A
Z: 1, X: a, Y: B
Z: 1, X: a, Y: C
Z: 1, X: b, Y: A
Z: 1, X: b, Y: B
Z: 1, X: b, Y: C
Z: 1, X: c, Y: A
Z: 1, X: c, Y: B
Z: 1, X: c, Y: C
Z: 2, X: a, Y: A
Z: 2, X: a, Y: B
Z: 2, X: a, Y: C
Z: 2, X: b, Y: A
Z: 2, X: b, Y: B
Z: 2, X: b, Y: C
Z: 2, X: c, Y: A
Z: 2, X: c, Y: B
Z: 2, X: c, Y: C
Z: 3, X: a, Y: A
Z: 3, X: a, Y: B
Z: 3, X: a, Y: C
Z: 3, X: b, Y: A
Z: 3, X: b, Y: B
Z: 3, X: b, Y: C
Z: 3, X: c, Y: A
Z: 3, X: c, Y: B
Z: 3, X: c, Y: C
*/
