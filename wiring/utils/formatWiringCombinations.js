import { indentText, mapObject } from "../../utils/general.js";
import enrichWiringCombinations from "./enrichWiringCombinations.js";

export default function formatWiringCombinations(wiringCombinations) {
    const enrichedCombination = enrichWiringCombinations(wiringCombinations);

    const formattedCombinationSegments = enrichedCombination.map(formatEnrichedCombination);

    return `${formattedCombinationSegments.join('\n')}\n`;
}

function formatEnrichedCombination(comb, index) {
    const headerline = `#${index + 1}:`;
    const wiringSegments = mapObject(comb, getWiringSegment);

    return headerline + '\n' + indent(wiringSegments.join('\n'));
}

function getWiringSegment(wires, wiringName) {
    const wiringHeaderLine = `${wiringName}:`;
    const wiringLines = mapObject(wires, getWiringLine);

    return wiringHeaderLine + '\n' + indent(wiringLines.join('\n'));
}

function getWiringLine(enrichedWire, joint) {
    const { value: wire, next } = enrichedWire;

    let result = `${joint} - ${wire}`;
    if (next) result += ` -> ${next}`;

    return result;
}

function indent(text) {
    const BASE_PADDING = '  ';
    return indentText(text, BASE_PADDING);
}
