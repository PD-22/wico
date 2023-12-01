import assert from "assert";
import indent from "../../utils/indent.js";

assert.strictEqual(indent("A\nB\nC", '-'), "-A\n-B\n-C")

console.log('PASS');
