import { deepArrayCompare } from "../../utils/general.js";

export default function checkArraysMatch(result1, result2) {
    console.log("Results match...");
    const resultsMatch = deepArrayCompare(result1, result2);
    console.log(`${Boolean(resultsMatch)}\n`);
    return resultsMatch;
}
