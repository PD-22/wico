const fs = require('fs');
const path = require('path');

function compareFiles(file1Path, file2Path, outputFilePath) {
    const differingLineNumbers = [];

    const file1 = fs.readFileSync(file1Path, 'utf-8').split('\n');
    const file2 = fs.readFileSync(file2Path, 'utf-8').split('\n');

    for (let lineNumber = 0; lineNumber < Math.min(file1.length, file2.length); lineNumber++) {
        if (file1[lineNumber] !== file2[lineNumber]) {
            differingLineNumbers.push(lineNumber + 1);
        }
    }

    fs.writeFileSync(outputFilePath, differingLineNumbers.join('\n') + '\n');
}

const scriptDirectory = __dirname;
const file1Path = path.join(scriptDirectory, 'output-new-combinations.txt');
const file2Path = path.join(scriptDirectory, 'output-old-combinations.txt');
const outputFilePath = path.join(scriptDirectory, 'output.txt');

console.log(`Writing to: "${outputFilePath}"`);
compareFiles(file1Path, file2Path, outputFilePath);
console.log("Done");
