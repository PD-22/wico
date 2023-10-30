import { getMinDiffArrayPermutations } from "./permutationsOptimization.js";

const permutations = getMinDiffArrayPermutations([1, 2, 3, 4]);
console.log(permutations.map(arr => arr.join(' ')).join('\n'));
/*
1 2 3 4
1 2 4 3
1 3 4 2
1 3 2 4
1 4 2 3
1 4 3 2
2 4 3 1
2 4 1 3
2 3 1 4
2 3 4 1
2 1 4 3
2 1 3 4
3 1 2 4
3 1 4 2
3 2 4 1
3 2 1 4
3 4 1 2
3 4 2 1
4 3 2 1
4 3 1 2
4 2 1 3
4 2 3 1
4 1 3 2
4 1 2 3
*/
// difference between every adjacent permutation is only 2
