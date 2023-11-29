import indent from "../utils/indent.js";
import lines from "../utils/lines.js";
import map from "../utils/map.js";

/**
 * @param {Record<string, Record<string, string>>[]} combList 
 * @returns {string}
 */
export default function formatWiring(combList) {
    const combinations = combList.map((comb, index) =>
        formatCombinationEntry(comb, index, combList)
    );
    return lines(...combinations) + '\n';
}

/**
 * @param {Record<string, Record<string, string>>} comb 
 * @param {number} index 
 * @param {Record<string, Record<string, string>>[]} combList 
 * @returns {string}
 */
function formatCombinationEntry(comb, index, combList) {
    const nextComb = combList[index + 1];
    const wiringSegments = map(comb, (wires, wiringName) =>
        formatWiringSegment(wires, wiringName, nextComb)
    );
    return lines(`#${index + 1}:`, indent(lines(...wiringSegments)));
}

/**
 * @param {Record<string, string>} wires 
 * @param {string} wiringName 
 * @param {Record<string, Record<string, string>>} nextComb 
 * @returns {string}
 */
function formatWiringSegment(wires, wiringName, nextComb) {
    const nextWires = nextComb?.[wiringName];
    const wiringLines = map(wires, (wire, joint) =>
        formatWireLine(wire, joint, nextWires)
    );
    return lines(`${wiringName}:`, indent(lines(...wiringLines)));
}

/**
 * @param {string} wire
 * @param {string} joint
 * @param {Record<string, string>} nextWires
 * @returns {string}
 */
function formatWireLine(wire, joint, nextWires) {
    return `${joint} - ${wire}` + getNextWireSuffix(wire, joint, nextWires);
}

/**
 * @param {string} wire
 * @param {string} joint
 * @param {Record<string, string>} nextWires
 */
function getNextWireSuffix(wire, joint, nextWires) {
    const nextWire = nextWires?.[joint];
    const wireChanges = nextWire && wire !== nextWire;
    return wireChanges ? ` -> ${nextWire}` : '';
}
