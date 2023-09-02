import { countObjDiff, transformObject } from "../../utils/general.js";

export default function enrichWiringCombinations(wiringCombinations) {
    return wiringCombinations.map((comb, i) => {
        const nextComb = wiringCombinations[i + 1];

        const result = {
            diff: enrichDiff(comb, nextComb),
            comb: enrichComb(comb, nextComb)
        };

        return result;
    });
}

function enrichComb(comb, nextComb) {
    let nextNumberCounter = 0;

    return transformObject(comb, (wires, type) => {
        const nextWires = nextComb?.[type];

        const newWires = transformObject(wires, (wire, label) => {
            const newWire = { value: wire };

            const nextWire = nextWires?.[label];
            const wireChanged = nextWire && nextWire !== wire;
            if (wireChanged) {
                newWire.next = nextWire;
                newWire.nextNumber = ++nextNumberCounter;
            }
            return [label, newWire];
        });

        return [type, newWires];
    });
}

function enrichDiff(current, next) {
    if (!next) return 0;

    return Object.keys(current).reduce(calculate, 0);

    function calculate(acc, key) {
        return acc + countObjDiff(current[key], next[key]);
    }
}
