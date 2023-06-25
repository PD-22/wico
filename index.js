const circuitKeys = "blue red green copper".split(" ");
const circuitValues = "gmrl".split("");
const circuitCombinations = keyValuesCombs(circuitKeys, circuitValues);

const soundKeys = "red copper green".split(" ");
const soundValues = "rgl".split("");
const soundCombinations = keyValuesCombs(soundKeys, soundValues);

const combinations = mergeCircuitSoundCombs(circuitCombinations, soundCombinations);

console.log(combinations.map((comb, i) => `${i})\n` + combToString(comb)).join('\n'));

function combToString(comb) {
    let result = "";

    result += "circuit:\n";
    for (const key in comb.circuit) {
        result += `  ${key} - ${comb.circuit[key]}\n`;
    }

    result += "sound:\n";
    for (const key in comb.sound) {
        result += `  ${key} - ${comb.sound[key]}\n`;
    }

    return result;
}

function keyValuesCombs(keys, values) {
    if (keys.length !== values.length) {
        throw new Error("Keys and values must have the same length");
    }

    const combinations = [];

    function generate(currentCombo, remainingKeys, remainingValues) {
        if (remainingKeys.length === 0) {
            combinations.push(currentCombo);
            return;
        }

        const currentKey = remainingKeys[0];
        for (let i = 0; i < remainingValues.length; i++) {
            const currentValue = remainingValues[i];
            generate(
                { ...currentCombo, [currentKey]: currentValue },
                remainingKeys.slice(1),
                remainingValues.filter((_, idx) => idx !== i)
            );
        }
    }

    generate({}, keys, values);

    return combinations;
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