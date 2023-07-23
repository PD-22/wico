const fs = require('fs');
const { zip, countObjDiff, transformObject } = require('./utils');
const { getMinDiffPermutations } = require('./permutationsOptimization');

const auxPermutations = getMinDiffKeyValuePermutations(
    "mrlg".split(""),
    "blue red green copper".split(" ")
);

const soundPermutations = getMinDiffKeyValuePermutations(
    "rgl".split(""),
    "red copper green".split(" ")
);

const wiringCombinations = combineArraysWithKeys(
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

function combineArraysWithKeys(key1, array1, key2, array2) {
    return array1.flatMap(item1 => array2.map(item2 =>
        ({ [key1]: item1, [key2]: item2 })
    ));
}

function formatWiringCombinations(wiringCombinations) {
    const enrichedCombination = wiringCombinations.map(enrichWiringCombinations);

    const formattedCombinations = enrichedCombination.map(formatEnrichedCombination).join('');
    const totalDiffs = enrichedCombination.map(x => x.diff).reduce((a, b) => a + b);

    return `total diffs: ${totalDiffs}\n\ncombinations:\n${formattedCombinations}`;

    function formatEnrichedCombination({ comb, diff }, i) {
        return `  #${i + 1} (${diff}):\n${circuitSoundCombToString(comb, '    ')}`;
    }
}

function enrichWiringCombinations(comb, i) {
    const nextComb = wiringCombinations[i + 1];

    const result = {
        diff: calculateDiff(comb, nextComb),
        comb: calculateComb(comb, nextComb)
    };

    return result;

    function calculateComb(comb, nextComb) {
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

    function calculateDiff(comb, nextComb) {
        if (!nextComb) return 0;

        return Object.keys(comb).reduce(calculate, 0);

        function calculate(acc, wiringName) {
            return acc + countObjDiff(comb[wiringName], nextComb[wiringName]);
        }
    }
}

function circuitSoundCombToString(comb, padding = '') {
    let result = "";

    Object.keys(comb).forEach(wiringName => {
        result += `${padding}${wiringName}:\n`;
        for (const [key, { value, next, nextNumber }] of Object.entries(comb[wiringName])) {
            result += `${padding}  ${key} - ${value}`;
            if (next) result += ` -> ${next} (${nextNumber})`;
            result += "\n";
        }
    });

    return result;
}
