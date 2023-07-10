function generatePermutations(set) {
    const workList = [];
    const result = [];

    workList.push([[], set]);
    while (workList.length) recursion(...workList.pop());
    return result.toReversed();

    function recursion(accumulator, variants) {
        if (!variants.length) {
            result.push(accumulator);
            return;
        }

        variants.forEach((target, index) => {
            const next = [...accumulator, target];
            const rest = variants.filter((_, i) => i !== index);
            workList.push([next, rest]);
        })
    }
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function checkPermutWaysDiff(arr) {
    const diff = listDiffSum(arr);
    const minDiff = getMinDiff(arr[0].length);
    return diff === minDiff;

    function getMinDiff(length) {
        return 2 * (factorial(length) - 1);
    }

    function calcListDiff(arr1, arr2) {
        let count = 0;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) count++;
        }
        return count;
    }

    function listDiffSum(list) {
        return list.reduce((acc, curr, index, arr) => {
            const next = arr[index + 1];
            const diff = next ? calcListDiff(curr, next) : 0;
            return acc + diff;
        }, 0)
    }
}

// all permutations of a set using a single switch of pair items
function mutantFastest(wiring) {
    const permutations = measure(generatePermutations)(wiring);
    measure(optimizePermutations)(0, factorial(wiring.length - 1), wiring.length);
    return permutations;

    function optimizePermutations(startOffset, size, amount) {
        if (amount <= 2) return;
        for (let i = 0; i < amount; i++) {
            const start = startOffset + (size * i);
            const end = start + size;
            const newAmount = amount - 1;
            optimizePermutations(start, size / newAmount, newAmount);
            if (i % 2) reverseRange(permutations, start, end);
        }
    }

    function reverseRange(arr, start, end) {
        while (start < end - 1) {
            const temp = arr[start];
            arr[start] = arr[end - 1];
            arr[end - 1] = temp;
            start++;
            end--;
        }
    }
};

function measure(callback) {
    return (...args) => {
        console.log(`${callback.name}...`);
        const [result, deltaTime] = stopwatch(() => callback(...args));
        console.log(`${callback.name}(${deltaTime.toFixed()} ms)`);
        return result;
    };

    function stopwatch(callback) {
        const startTime = performance.now();
        const result = callback();
        const endTime = performance.now();
        const deltaTime = endTime - startTime;
        return [result, deltaTime];
    }
}

const wiring = Array.from("ABCDEFGHIJ");
const fastestWay = measure(mutantFastest)(wiring);
const result = measure(checkPermutWaysDiff)(fastestWay);
console.log(result);
