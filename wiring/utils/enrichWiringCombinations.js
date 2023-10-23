import { transformObject } from "../../utils/general.js";

export default function enrichWiringCombinations(wiringCombinations) {
    return wiringCombinations.map((comb, i) => enrichComb(comb, wiringCombinations[i + 1]));
}

function enrichComb(comb, nextComb) {
    return transformObject(comb, (wires, type) => {
        const nextWires = nextComb?.[type];

        const newWires = transformObject(wires, (wire, label) => {
            const newWire = { value: wire };

            const nextWire = nextWires?.[label];
            const wireChanged = nextWire && nextWire !== wire;
            if (wireChanged) {
                newWire.next = nextWire;
            }
            return [label, newWire];
        });

        return [type, newWires];
    });
}
