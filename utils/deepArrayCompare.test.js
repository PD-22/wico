import deepArrayCompare from "./deepArrayCompare.js";

const array1 = [1, 2, [3, 4, [5, 6]]];

console.log(deepArrayCompare(array1, [1, 2, [3, 4, [5, 6]]])); // true
console.log(deepArrayCompare(array1, [1, 2, [3, 4, [5, 7]]])); // false
