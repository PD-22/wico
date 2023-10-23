import { indentText, mapObject } from "../../utils/general.js";

export default function formatWiringCombinations(wiringCombinations) {
    const formattedCombinationSegments = wiringCombinations.map(formatCombination);

    return `${formattedCombinationSegments.join('\n')}\n`;
}

function formatCombination(comb, index, combList) {
    const nextComb = combList[index + 1];

    const headerline = `#${index + 1}:`;

    const wiringSegments = mapObject(comb,
        (wires, wiringName) => getWiringSegment(wires, wiringName, nextComb?.[wiringName])
    );

    return headerline + '\n' + indent(wiringSegments.join('\n'));
}

function getWiringSegment(wires, wiringName, nextWires) {
    const wiringHeaderLine = `${wiringName}:`;
    const wiringLines = mapObject(wires,
        (wire, joint) => getWiringLine(wire, joint, nextWires?.[joint])
    );

    return wiringHeaderLine + '\n' + indent(wiringLines.join('\n'));
}

function getWiringLine(wire, joint, nextWire) {
    let result = `${joint} - ${wire}`;
    if (nextWire && wire !== nextWire) result += ` -> ${nextWire}`;

    return result;
}

function indent(text) {
    const BASE_PADDING = '  ';
    return indentText(text, BASE_PADDING);
}
