const fs = require('fs');
const { getPermutations } = require("./permutations");
const { zip } = require('./utils');

function keyValuesCombs(keys, values) {
    if (keys.length !== values.length)
        throw new Error("Keys and values must have the same length");

    return getPermutations(values).map(
        permutation => Object.fromEntries(zip(keys, permutation))
    );
}

function mergeCircuitSoundCombs(circuitCombinations, soundCombinations) {
    const mergedCombinations = [];

    for (const circuitCombo of circuitCombinations) {
        for (const soundCombo of soundCombinations) {
            mergedCombinations.push({ circuit: circuitCombo, sound: soundCombo });
        }
    }

    return mergedCombinations;
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

function circuitSoundCombDiff(a, b) {
    let result = 0;

    Object.keys(a).forEach(key => {
        const currentWires = a[key];
        const nextWires = b[key];

        result += Object
            .keys(currentWires)
            .filter(wireKey => currentWires[wireKey] !== nextWires[wireKey])
            .length;
    });

    return result
}

const circuitKeys = "mrlg".split("");
const circuitValues = "blue red green copper".split(" ");
const circuitCombinations = keyValuesCombs(circuitKeys, circuitValues);

const soundKeys = "rgl".split("");
const soundValues = "red copper green".split(" ");
const soundCombinations = keyValuesCombs(soundKeys, soundValues);

const combinations = mergeCircuitSoundCombs(circuitCombinations, soundCombinations);

const enrichedCombinations = combinations.map((comb, i) => {
    const result = {};

    const nextComb = combinations[i + 1];

    let nextNumberCounter = 0;
    result.comb = Object.fromEntries(Object.entries(comb).map(([type, wires]) => {
        const nextWires = nextComb && nextComb[type];
        const newWires = Object.fromEntries(Object.entries(wires).map(([label, color]) => {
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
        }));
        return [type, newWires];
    }));

    result.diff = nextComb ? circuitSoundCombDiff(comb, nextComb) : 0;

    return result;
});

function formatCombinations({ comb, diff }, i) {
    return `  #${i + 1} (${diff}):\n${circuitSoundCombToString(comb, '    ')}`;
}

const totalSwitches = enrichedCombinations.map(x => x.diff).reduce((a, b) => a + b);
const formattedCombinations = enrichedCombinations.map(formatCombinations).join('');
const data = `all combinations:\n${formattedCombinations}\ntotal switches: ${totalSwitches}\n`;

fs.writeFileSync('output.txt', data);

const fileContentMatches = fs.readFileSync('output copy.txt', 'utf8') === data;

console.log(`file content matches: ${fileContentMatches}`);
