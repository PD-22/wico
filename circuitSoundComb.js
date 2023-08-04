const fs = require('fs');
const { zip, countObjDiff, transformObject, mapObject, indentText } = require('./utils');
const { getMinDiffPermutations } = require('./permutationsOptimization');

const auxPermutations = getMinDiffKeyValuePermutations(
    "mrlg".split(""),
    "blue red green copper".split(" ")
);

const soundPermutations = getMinDiffKeyValuePermutations(
    "rgl".split(""),
    "red copper green".split(" ")
);

const wiringCombinations = combineArraysWithKeysReversedAlternate(
    'aux', auxPermutations,
    'sound', soundPermutations
);

const formattedCombinations = formatWiringCombinations(wiringCombinations);
fs.writeFileSync('output.txt', formattedCombinations);

const oldFormattedCombinations = fs.readFileSync('output copy.txt', 'utf8');

console.log(`file content matches: ${oldFormattedCombinations === formattedCombinations}`);

function getMinDiffKeyValuePermutations(keys, values) {
    return getMinDiffPermutations(values).map(valuesPermutation =>
        Object.fromEntries(zip(keys, valuesPermutation))
    );
}

function combineArraysWithKeysReversedAlternate(key1, array1, key2, array2) {
    return array1.flatMap((item1, i) => {
        const array2Alter = i % 2 ? array2.toReversed() : array2;
        return array2Alter.map(item2 => ({ [key1]: item1, [key2]: item2 }));
    });
}

function formatWiringCombinations(wiringCombinations) {
    const enrichedCombination = enrichWiringCombinations(wiringCombinations);

    const totalDiffs = enrichedCombination.map(x => x.diff).reduce((a, b) => a + b);
    const formattedDiffs = `total diffs: ${totalDiffs}`;

    const formattedCombinationSegments = enrichedCombination.map(formatEnrichedCombination);
    const formattedCombinations = `combinations:\n${indent(formattedCombinationSegments.join('\n'))}\n`;

    return `${formattedDiffs}\n\n${formattedCombinations}`;
}

function enrichWiringCombinations(wiringCombinations) {
    return wiringCombinations.map((comb, i) => {
        const nextComb = wiringCombinations[i + 1];

        const result = {
            diff: enrichDiff(comb, nextComb),
            comb: enrichComb(comb, nextComb)
        };

        return result;
    });

    function enrichComb(comb, nextComb) {
        let nextNumberCounter = 0;

        return transformObject(comb, (type, wires) => {
            const nextWires = nextComb?.[type];

            const newWires = transformObject(wires, (label, wire) => {
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
}

function formatEnrichedCombination({ comb, diff }, index) {
    const headerline = `#${index + 1} (${diff}):`;
    const wiringSegments = mapObject(comb, getWiringSegment);

    return headerline + '\n' + indent(wiringSegments.join('\n'));

    function getWiringSegment(wiringName, wires) {
        const wiringHeaderLine = `${wiringName}:`;
        const wiringLines = mapObject(wires, getWiringLine);

        return wiringHeaderLine + '\n' + indent(wiringLines.join('\n'));
    }

    function getWiringLine(joint, enrichedWire) {
        const { value: wire, next, nextNumber } = enrichedWire;

        let result = `${joint} - ${wire}`;
        if (next) result += ` -> ${next} (${nextNumber})`;

        return result;
    }
}

function indent(text) {
    const BASE_PADDING = '  ';
    return indentText(text, BASE_PADDING);
}
