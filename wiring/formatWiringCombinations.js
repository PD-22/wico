import { indentText, mapObject } from "../utils/general.js";

export default function formatWiringCombinations(combList) {
    const combinations = combList.map((comb, index) =>
        formatCombinationEntry(comb, index, combList)
    );

    return lines(...combinations) + '\n';
}

function formatCombinationEntry(comb, index, combList) {
    const nextComb = combList[index + 1];

    const wiringSegments = mapObject(comb, (wires, wiringName) =>
        formatWiringSegment(wires, wiringName, nextComb)
    );

    return lines(`#${index + 1}:`, indent(lines(...wiringSegments)));
}

function formatWiringSegment(wires, wiringName, nextComb) {
    const nextWires = nextComb?.[wiringName];

    const wiringLines = mapObject(wires, (wire, joint) =>
        formatWireLine(wire, joint, nextWires)
    );

    return lines(`${wiringName}:`, indent(lines(...wiringLines)));
}

function formatWireLine(wire, joint, nextWires) {
    const nextWire = nextWires?.[joint];
    const wireChanges = nextWire && wire !== nextWire;

    return `${joint} - ${wire}${wireChanges ? ` -> ${nextWire}` : ''}`;
}

function lines(...strList) {
    return strList.join('\n');
}

function indent(text) {
    const BASE_PADDING = '  ';
    return indentText(text, BASE_PADDING);
}
