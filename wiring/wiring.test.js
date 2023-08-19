const path = require('path');
const { testWiring } = require('./utils');

testWiring({
    wiringSettings: [
        {
            name: "aux",
            points: "mrlg".split(""),
            wires: "blue red green copper".split(" "),
        },
        {
            name: "sound",
            points: "rgl".split(""),
            wires: "red copper green".split(" "),
        }
    ],
    outputFile: path.join(__dirname, 'output.txt'),
    outputCompareFile: path.join(__dirname, 'output copy.txt'),
});
