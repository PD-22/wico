import mapObject from "./mapObject.js";

console.log(mapObject({ a: 1, b: 2, c: 3 }, (v, k, i) => [v, k, i].join(' ')));
// [ '1 a 0', '2 b 1', '3 c 2' ]