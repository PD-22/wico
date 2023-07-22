const fs = require('fs');
const { zip, countObjDiff, mapObject } = require('./utils');
const { getMinDiffPermutations } = require('./permutationsOptimization');

const auxPermutations = getOptimizedKeyValuePermutations(
    "mrlg".split(""),
    "blue red green copper".split(" ")
);

const soundPermutations = getOptimizedKeyValuePermutations(
    "rgl".split(""),
    "red copper green".split(" ")
);

const wiringCombinations = combineArraysWithKeys(
    'aux', auxPermutations,
    'sound', soundPermutations
);

const formattedCombinations = formatCircuitSoundCombinations(wiringCombinations);
fs.writeFileSync('output.txt', formattedCombinations);

const oldFormattedCombinations = fs.readFileSync('output copy.txt', 'utf8');

console.log(`file content matches: ${oldFormattedCombinations === formattedCombinations}`);

function getOptimizedKeyValuePermutations(keys, values) {
    return getMinDiffPermutations(values).map(valuesPermutation =>
        Object.fromEntries(zip(keys, valuesPermutation))
    );
}

function combineArraysWithKeys(key1, array1, key2, array2) {
    return array1.flatMap(item1 => array2.map(item2 =>
        ({ [key1]: item1, [key2]: item2 })
    ));
}

function formatCircuitSoundCombinations(wiringCombinations) {
    const enrichedCombination = wiringCombinations.map(enrichCombination);

    const formattedCombinations = enrichedCombination.map(formatEnrichedCombination).join('');
    const totalSwitches = enrichedCombination.map(x => x.diff).reduce((a, b) => a + b);

    return `total switches: ${totalSwitches}\n\nall combinations:\n${formattedCombinations}`;

    function formatEnrichedCombination({ comb, diff }, i) {
        return `  #${i + 1} (${diff}):\n${circuitSoundCombToString(comb, '    ')}`;
    }
}

function enrichCombination(comb, i) {
    const nextComb = wiringCombinations[i + 1];

    const result = {
        diff: calculateDiff(nextComb),
        comb: calculateComb(nextComb)
    };

    return result;

    function calculateComb(nextComb) {
        let nextNumberCounter = 0;

        return mapObject(comb, (type, wires) => {
            const nextWires = nextComb?.[type];

            const newWires = mapObject(wires, (label, color) => {
                const newColor = { color };

                const nextColor = nextWires?.[label];
                const colorChanged = nextColor && nextColor !== color;
                if (colorChanged) {
                    newColor.next = nextColor;
                    newColor.nextNumber = ++nextNumberCounter;
                }
                return [label, newColor];
            });

            return [type, newWires];
        });
    }

    function calculateDiff(nextComb) {
        let result = 0;
        if (nextComb) {
            result += countObjDiff(comb.aux, nextComb.aux);
            result += countObjDiff(comb.sound, nextComb.sound);
        }
        return result;
    }
}

function circuitSoundCombToString(comb, padding = '') {
    let result = "";

    result += `${padding}aux:\n`;
    for (const [key, { color, next, nextNumber }] of Object.entries(comb.aux)) {
        result += `${padding}  ${key} - ${color}`;
        if (next) result += ` -> ${next} (${nextNumber})`;
        result += "\n";
    }

    result += `${padding}sound:\n`;
    for (const [key, { color, next, nextNumber }] of Object.entries(comb.sound)) {
        result += `${padding}  ${key} - ${color}`;
        if (next) result += ` -> ${next} (${nextNumber})`;
        result += "\n";
    }

    return result;
}
