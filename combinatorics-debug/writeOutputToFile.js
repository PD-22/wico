import { writeFileSync } from "fs";
import { formatCombinatorics } from "./formatCombinatorics.js";

export default function writeOutputToFile(outputList, outputFile) {
    console.log(`Writing output to "${outputFile}"...`);
    const formattedOutputList = formatCombinatorics(outputList);
    writeFileSync(outputFile, formattedOutputList);
    console.log(`Done\n`);
}
