import { readFileSync } from "fs";
import { compareFileContents } from "../utils/general.js";
import { formatCombinatorics } from "./formatCombinatorics.js";

export default function compareOutputToFile(outputList, compareFile) {
    console.log(`Compare output to "${compareFile}"...`);
    const formattedOutputList = formatCombinatorics(outputList);
    const formattedCompareData = readFileSync(compareFile, 'utf8');
    const matches = compareFileContents(formattedCompareData, formattedOutputList);
    console.log(`Match: ${matches}`);
}
