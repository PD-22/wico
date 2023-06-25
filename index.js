const circuitKeys = "Blue Red Green Copper".split(" ");
const circuitValues = "GMRL".split("");
const circuitCombinations = keyValuesCombinations(circuitKeys, circuitValues);

const soundKeys = "Red Copper Green".split(" ");
const soundValues = "RGL".split("");
const soundCombinations = keyValuesCombinations(soundKeys, soundValues);

const combinations = mergeCircuitSoundCombinations(circuitCombinations, soundCombinations);

console.log(combinations);

function keyValuesCombinations(keys, values) {
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

function mergeCircuitSoundCombinations(circuitCombinations, soundCombinations) {
    const mergedCombinations = [];

    for (const circuitCombo of circuitCombinations) {
        for (const soundCombo of soundCombinations) {
            mergedCombinations.push({ Circuit: circuitCombo, Sound: soundCombo });
        }
    }

    return mergedCombinations;
}