function calcListDiff(arr1, arr2) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) count++;
    }
    return count;
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
