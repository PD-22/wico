const fs = require('fs');
const { getPermutations } = require("./permutations");
const { zip, countObjDiff, mapObject } = require('./utils');

const circuitCombinations = getKeyValuePermutations(
    "mrlg".split(""),
    "blue red green copper".split(" ")
);

const soundCombinations = getKeyValuePermutations(
    "rgl".split(""),
    "red copper green".split(" ")
);

const wiringCombinations = combineArraysWithKeys(
    'circuit', circuitCombinations,
    'sound', soundCombinations
);

const formattedCombinations = formatCombinations(wiringCombinations);
fs.writeFileSync('output.txt', formattedCombinations);

const oldFormattedCombinations = fs.readFileSync('output copy.txt', 'utf8');

console.log(`file content matches: ${oldFormattedCombinations === formattedCombinations}`);

function getKeyValuePermutations(keys, values) {
    return getPermutations(values).map(valuesPermutation =>
        Object.fromEntries(zip(keys, valuesPermutation))
    );
}

function combineArraysWithKeys(key1, array1, key2, array2) {
    return array1.flatMap(item1 => array2.map(item2 =>
        ({ [key1]: item1, [key2]: item2 })
    ));
}

function circuitSoundCombToString(comb, padding = '') {
    let result = "";

    result += `${padding}circuit:\n`;
    for (const [key, { color, next, nextNumber }] of Object.entries(comb.circuit)) {
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

function enrichCombination(comb, i) {
    const result = {};

    const nextComb = wiringCombinations[i + 1];

    let nextNumberCounter = 0;
    result.comb = mapObject(comb, (type, wires) => {
        const nextWires = nextComb && nextComb[type];
        const newWires = mapObject(wires, (label, color) => {
            let next = null;
            let nextNumber = null;
            const nextColor = nextWires && nextWires[label];
            const colorChanged = nextColor && color !== nextColor;
            if (colorChanged) {
                next = nextColor;
                nextNumber = ++nextNumberCounter;
            }
            const newColor = { color, next, nextNumber };
            return [label, newColor];
        });
        return [type, newWires];
    });

    result.diff = 0;
    if (nextComb) {
        result.diff += countObjDiff(comb.circuit, nextComb.circuit);
        result.diff += countObjDiff(comb.sound, nextComb.sound);
    }

    return result;
}

function formatCombinations(combinations) {
    const enrichedCombination = combinations.map(enrichCombination);

    const formattedCombinations = enrichedCombination.map(formatEnrichedCombination).join('');
    const totalSwitches = enrichedCombination.map(x => x.diff).reduce((a, b) => a + b);

    return `all combinations:\n${formattedCombinations}\ntotal switches: ${totalSwitches}\n`;

    function formatEnrichedCombination({ comb, diff }, i) {
        return `  #${i + 1} (${diff}):\n${circuitSoundCombToString(comb, '    ')}`;
    }
}
