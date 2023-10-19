import { writeFileSync } from "fs";
import getWiringCombinations from "./getWiringCombinations.js";
import formatWiringCombinations from "./formatWiringCombinations.js";
import compareDataToFile from "./compareDataToFile.js";

export default function testWiring({ wiringSettings, outputFile, outputCompareFile }) {
    const wiringCombinations = getWiringCombinations(wiringSettings);

    const formattedCombinations = formatWiringCombinations(wiringCombinations);

    writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}
