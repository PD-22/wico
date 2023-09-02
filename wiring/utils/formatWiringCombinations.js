import { indentText, mapObject } from "../../utils/general.js";
import enrichWiringCombinations from "./enrichWiringCombinations.js";

export default function formatWiringCombinations(wiringCombinations) {
    const enrichedCombination = enrichWiringCombinations(wiringCombinations);

    const totalDiffs = enrichedCombination.map(x => x.diff).reduce((a, b) => a + b);
    const formattedDiffs = `total diffs: ${totalDiffs}`;

    const formattedCombinationSegments = enrichedCombination.map(formatEnrichedCombination);
    const formattedCombinations = `combinations:\n${indent(formattedCombinationSegments.join('\n'))}\n`;

    return `${formattedDiffs}\n\n${formattedCombinations}`;
}

function formatEnrichedCombination({ comb, diff }, index) {
    const headerline = `#${index + 1} (${diff}):`;
    const wiringSegments = mapObject(comb, getWiringSegment);

    return headerline + '\n' + indent(wiringSegments.join('\n'));
}

function getWiringSegment(wires, wiringName) {
    const wiringHeaderLine = `${wiringName}:`;
    const wiringLines = mapObject(wires, getWiringLine);

    return wiringHeaderLine + '\n' + indent(wiringLines.join('\n'));
}

function getWiringLine(enrichedWire, joint) {
    const { value: wire, next, nextNumber } = enrichedWire;

    let result = `${joint} - ${wire}`;
    if (next) result += ` -> ${next} (${nextNumber})`;

    return result;
}

function indent(text) {
    const BASE_PADDING = '  ';
    return indentText(text, BASE_PADDING);
}
