const fs = require('fs');
const { zip, countObjDiff, transformObject, mapObject, indentText } = require('../utils/general');
const { getMinDiffPermutations } = require('../permutations/permutationsOptimization');
const { getMinDiffCombinations } = require('../combinations/combinationsOptimization');
const path = require('path');
const { compareDataToFile } = require('../utils/debug');

start({
    wiringSettings: [
        {
            name: "aux",
            points: "mrlg".split(""),
            wires: "blue red green copper".split(" "),
        },
        {
            name: "sound",
            points: "rgl".split(""),
            wires: "red copper green".split(" "),
        }
    ],
    outputFile: path.join(__dirname, 'output.txt'),
    outputCompareFile: path.join(__dirname, 'output copy.txt'),
});

function start({ wiringSettings, outputFile, outputCompareFile }) {
    const wiringCombinations = getWiringCombinations(wiringSettings);

    const formattedCombinations = formatWiringCombinations(wiringCombinations);

    fs.writeFileSync(outputFile, formattedCombinations);
    console.log(`result: "${outputFile}"`);

    if (outputCompareFile) compareDataToFile(formattedCombinations, outputCompareFile);
}

// TODO: make it work on multiple settings (>2)
function getWiringCombinations(wiringSettings) {
    const [settings1, settings2] = wiringSettings;

    const permutations1 = getWiringPermutations(settings1);
    const permutations2 = getWiringPermutations(settings2);

    return getMinDiffCombinations({
        [settings1.name]: permutations1,
        [settings2.name]: permutations2
    });
}

function getWiringPermutations(wiringSetting) {
    return getMinDiffKeyValuePermutations(wiringSetting.points, wiringSetting.wires);
}

function getMinDiffKeyValuePermutations(keys, values) {
    return getMinDiffPermutations(values).map(valuesPermutation =>
        Object.fromEntries(zip(keys, valuesPermutation))
    );
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
