import { writeFileSync } from "fs";

/**
 * @param {string} formattedOutputList
 * @param {import("fs").PathLike} outputFile
 */
export default function writeOutputToFile(formattedOutputList, outputFile) {
    console.log(`Writing output to "${outputFile}"...`);
    writeFileSync(outputFile, formattedOutputList);
    console.log(`DONE`);
}
