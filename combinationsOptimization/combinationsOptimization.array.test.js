import { getMinDiffArrayCombinations } from "./combinationsOptimization.js";

const combinations = getMinDiffArrayCombinations([[1, 2, 3], ['a', 'b', 'c'], ['A', 'B', 'C']]);
console.log(combinations.map(arr => arr.join(' ')).join('\n'));
/*
1 a A
1 a B
1 a C
1 b C
1 b B
1 b A
1 c A
1 c B
1 c C
2 c C
2 c B
2 c A
2 b A
2 b B
2 b C
2 a C
2 a B
2 a A
3 a A
3 a B
3 a C
3 b C
3 b B
3 b A
3 c A
3 c B
3 c C
*/
// difference between every adjacent combination is only 1
