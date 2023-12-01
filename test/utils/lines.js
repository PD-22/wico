import assert from "assert";
import lines from "../../utils/lines.js";

assert.strictEqual(lines('alpha', 'beta', 'charlie'), "alpha\nbeta\ncharlie");

console.log('PASS');
