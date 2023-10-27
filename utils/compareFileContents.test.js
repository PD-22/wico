import compareFileContents from "./compareFileContents.js";

const lines = "A\nB";

console.log(compareFileContents(lines, "A\nB")); // true
console.log(compareFileContents(lines, "A\rB")); // true
console.log(compareFileContents(lines, "A\r\nB")); // true
console.log(compareFileContents(lines, "AB")); // false
