import mapValues from "./mapValues.js";

function callback(value, key, index) {
    return [value, key, index].join(' ');
}

console.log(mapValues({ A: 1, B: 2, C: 3 }, callback));
// { A: '1 A 0', B: '2 B 1', C: '3 C 2' }

console.log(mapValues([1, 2, 3], callback));
// [ '1 0 0', '2 1 1', '3 2 2' ]
