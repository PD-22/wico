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

function circuitSoundCombToString(comb) {
    let result = "";

    result += "circuit:\n";
    for (const [key, value] of Object.entries(comb.circuit)) {
        result += `  ${key} - ${value}\n`;
    }

    result += "sound:\n";
    for (const [key, value] of Object.entries(comb.sound)) {
        result += `  ${key} - ${value}\n`;
    }

    return result;
}

function countCircuitSoundCombSwitches(combinations) {
    let totalSwitches = [];

    for (let i = 0; i < combinations.length - 1; i++) {
        const currentCombination = combinations[i];
        const nextCombination = combinations[i + 1];

        totalSwitches[i] = 0;

        Object.keys(currentCombination).forEach(key => {
            const currentWires = currentCombination[key];
            const nextWires = nextCombination[key];

            Object.keys(currentWires).forEach(wireKey => {
                if (currentWires[wireKey] !== nextWires[wireKey]) {
                    totalSwitches[i]++;
                }
            });
        });
    }

    return totalSwitches;
}

function generatePermutations(arr) {
    const permutations = [];

    function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function permute(arr, start, end) {
        if (start === end) {
            permutations.push([...arr]);
        } else {
            for (let i = start; i <= end; i++) {
                swap(arr, start, i);
                permute(arr, start + 1, end);
                swap(arr, start, i);
            }
        }
    }

    permute(arr, 0, arr.length - 1);
    return permutations;
}

const circuitKeys = "blue red green copper".split(" ");
const circuitValues = "gmrl".split("");
const circuitCombinations = keyValuesCombs(circuitKeys, circuitValues);

const soundKeys = "red copper green".split(" ");
const soundValues = "rgl".split("");
const soundCombinations = keyValuesCombs(soundKeys, soundValues);

const combinations = mergeCircuitSoundCombs(circuitCombinations, soundCombinations);

console.log(combinations.map((comb, i) => `${i + 1})\n` + circuitSoundCombToString(comb)).join('\n'));
const switches = countCircuitSoundCombSwitches(combinations);
const switchSum = switches.reduce((a, b) => a + b);
console.log(switches, switchSum);
