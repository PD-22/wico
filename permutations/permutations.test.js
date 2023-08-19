const { createCharSequence } = require("../utils/general");
const path = require('path');
const { testPermutations } = require("./utils");

testPermutations(
    createCharSequence('A', 9),
    path.join(__dirname, 'output.txt'),
    x => x.join('') + '\n'
);
