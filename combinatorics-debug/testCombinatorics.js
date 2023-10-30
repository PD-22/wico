import compareDataToFile from "../debug/compareDataToFile.js";
import formatCombinatorics from "./formatCombinatorics.js";
import measureCombinatoricsPerfomance from "./processCombinatorics.js";
import validateOutputList from "./validateOutputList.js";
import writeOutputToFile from "./writeOutputToFile.js";

export const PROGRESS_BAR_WIDTH = 20;

export default function testCombinatoricsPerfomance({
    inputs,
    getCombinatoricsCallback,
    validateAdjacentItems,
    outputFile,
    compareFile
}) {
    const outputList = measureCombinatoricsPerfomance(inputs, getCombinatoricsCallback);
    if (validateAdjacentItems) validateOutputList(outputList, validateAdjacentItems);
    if (outputFile) writeOutputToFile(outputList, outputFile);
    if (compareFile) compareDataToFile(formatCombinatorics(outputList), compareFile);
}
