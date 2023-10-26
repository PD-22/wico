import transformObject from "./transformObject.js";

console.log(transformObject({ a: 1, b: 2, c: 3 }, (value, key) => [key.toUpperCase(), value * 2]));

// { A: 2, B: 4, C: 6 }
