function calcListDiff(arr1, arr2) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) count++;
    }
    return count;
}

function generatePermutations(input) {
    const result = [];

    function recursion(accumulator, variants) {
        if (variants.length <= 1) {
            const newResultItem = [...accumulator, ...variants];
            result.push(newResultItem);
            return;
        }

        for (let i = 0; i < variants.length; i++) {
            const variantChosen = variants[i];
            const nextAccumulator = [...accumulator, variantChosen];
            const variantsRest = [...variants.slice(0, i), ...variants.slice(i + 1)];
            recursion(nextAccumulator, variantsRest);
        }
    }

    recursion([], input);

    return result;
}

function mutantFastest(wiring) {
    const normalWiringOrder = generatePermutations(wiring);
    const allWiringOrders = generatePermutations(normalWiringOrder)

    const allWiringOrdersWithDiff = allWiringOrders.map((wiringOrder, i) => {
        return wiringOrder.map(enrichWiringOrder);

        function enrichWiringOrder(wiring, j) {
            const nextWiring = wiringOrder[j + 1];
            const diff = nextWiring ? calcListDiff(wiring, nextWiring) : 0;
            return { wiring, diff };
        }
    });

    const allWiringOrdersEnriched = allWiringOrdersWithDiff.map((wiringOrder) => {
        const diffSum = wiringOrder.map(x => x.diff).reduce((a, b) => a + b);
        return { wiringOrder, diffSum };
    });

    return allWiringOrdersEnriched.sort((a, b) => a.diffSum - b.diffSum)
}

function formatMutantFastest(fastestWays) {
    return fastestWays.map(
        ({ diffSum, wiringOrder }, i) => `${i}: (${diffSum})\n${wiringOrder.map(
            ({ diff, wiring }, i) => `    ${i}: ${wiring.join(' ')} ${diff ? `(${diff})` : ''}`
        ).join('\n')}`
    ).join('\n')
}

const wiring = ['copper', 'red', 'green'];
const fastestWays = mutantFastest(wiring);
console.log(formatMutantFastest(fastestWays));
