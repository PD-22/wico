import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { getDirname } from "../utils/debug.js";

const DIRNAME = getDirname(import.meta.url);

function compareFiles(file1Path, file2Path, outputFilePath) {
    const differingLineNumbers = [];

    const file1 = readFileSync(file1Path, 'utf-8').split('\n');
    const file2 = readFileSync(file2Path, 'utf-8').split('\n');

    for (let lineNumber = 0; lineNumber < Math.min(file1.length, file2.length); lineNumber++) {
        if (file1[lineNumber] !== file2[lineNumber]) {
            differingLineNumbers.push(lineNumber + 1);
        }
    }

    writeFileSync(outputFilePath, differingLineNumbers.join('\n') + '\n');
}

const scriptDirectory = DIRNAME;
const file1Path = join(scriptDirectory, 'output-new-combinations.txt');
const file2Path = join(scriptDirectory, 'output-old-combinations.txt');
const outputFilePath = join(scriptDirectory, 'output.txt');

console.log(`Writing to: "${outputFilePath}"`);
compareFiles(file1Path, file2Path, outputFilePath);
console.log("Done");
