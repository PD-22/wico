import compareJSON from './compareJSON.js';

const obj1 = { A: 'a', B: 'b', C: 'c' };

console.log(compareJSON(obj1, { A: 'a', B: 'b', C: 'c' })); // true
console.log(compareJSON(obj1, { A: 'a', B: 'x', C: 'c' })); // false
console.log(compareJSON(obj1, { A: 'a', B: 'b', X: 'c' })); // false
