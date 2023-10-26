import processCombinatorics from "./processCombinatorics.js";
import validateOutputList from "./validateOutputList.js";
import writeOutputToFile from "./writeOutputToFile.js";
import compareDataToFile from "../wiring/compareDataToFile.js";

export const PROGRESS_BAR_WIDTH = 20;

export default function testCombinatorics({
    inputs,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile
}) {
    const outputList = processCombinatorics(inputs, getCombinatoricsCallback);
    if (validateAdjacentItems) validateOutputList(outputList, validateAdjacentItems);
    if (outputFile) writeOutputToFile(outputList, outputFile);
    if (compareFile) compareDataToFile(formatCombinatorics(outputList), compareFile);
}