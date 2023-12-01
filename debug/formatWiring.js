import indent from "../utils/indent.js";
import lines from "../utils/lines.js";
import map from "../utils/map.js";

/** @typedef {string} Wire */
/** @typedef {string} Joint */
/** @typedef {Record<Joint, Wire>} Wiring */
/** @typedef {string} WiringName */
/** @typedef {Record<WiringName, Wiring>} Comb */

/**
 * @param {Comb[]} combList 
 * @returns {string}
 */
export default function formatWiring(combList) {
    const combinations = combList.map((comb, index) =>
        formatCombinationEntry(comb, index, combList)
    );
    return lines(...combinations) + '\n';
}

/**
 * @param {Comb} comb 
 * @param {number} index 
 * @param {Comb[]} combList 
 * @returns {string}
 */
function formatCombinationEntry(comb, index, combList) {
    const nextComb = combList[index + 1];
    const wiringSegments = map(comb, (wiring, wiringName) =>
        formatWiringSegment(wiring, wiringName, nextComb)
    );
    return lines(`#${index + 1}:`, indent(lines(...wiringSegments)));
}

/**
 * @param {Wiring} wiring 
 * @param {WiringName} wiringName 
 * @param {Comb} nextComb 
 * @returns {string}
 */
function formatWiringSegment(wiring, wiringName, nextComb) {
    const nextWiring = nextComb?.[wiringName];
    const wiringLines = map(wiring, (wire, joint) =>
        formatWireLine(wire, joint, nextWiring)
    );
    return lines(`${wiringName}:`, indent(lines(...wiringLines)));
}

/**
 * @param {Wire} wire
 * @param {Joint} joint
 * @param {Wiring} nextWiring
 * @returns {string}
 */
function formatWireLine(wire, joint, nextWiring) {
    return `${joint} - ${wire}` + getNextWireSuffix(wire, joint, nextWiring);
}

/**
 * @param {Wire} wire
 * @param {Joint} joint
 * @param {Wiring} nextWiring
 */
function getNextWireSuffix(wire, joint, nextWiring) {
    const nextWire = nextWiring?.[joint];
    const wireChanges = nextWire && wire !== nextWire;
    return wireChanges ? ` -> ${nextWire}` : '';
}
