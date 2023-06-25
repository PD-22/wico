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

function circuitSoundCombToString(comb, padding = '') {
    let result = "";

    result += `${padding}  circuit:\n`;
    for (const [key, value] of Object.entries(comb.circuit)) {
        result += `        ${key} - ${value}\n`;
    }

    result += `${padding}  sound:\n`;
    for (const [key, value] of Object.entries(comb.sound)) {
        result += `        ${key} - ${value}\n`;
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

const circuitKeys = "mrlg".split("");
const circuitValues = "blue red green copper".split(" ");
const circuitCombinations = keyValuesCombs(circuitKeys, circuitValues);

const soundKeys = "rgl".split("");
const soundValues = "red copper green".split(" ");
const soundCombinations = keyValuesCombs(soundKeys, soundValues);

const combinations = mergeCircuitSoundCombs(circuitCombinations, soundCombinations);

const logData = combinations.map((comb, i) => {
    const result = { comb };

    const nextComb = combinations[i + 1];
    result.diff = nextComb ? circuitSoundCombDiff(comb, nextComb) : 0;

    return result;
})

console.log(
    `all combinations:\n${logData.map(
        ({ comb, diff }, i) => {
            let result = '';
            result += `  ${i + 1}:\n`;
            result += `    diff: ${diff}\n`;
            result += circuitSoundCombToString(comb, '    ');
            return result;
        }
    ).join('')}`
);

console.log(
    "total switches:",
    logData.map(x => x.diff).reduce((a, b) => a + b)
);
