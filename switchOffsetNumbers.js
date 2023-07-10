function minimalSwitchPermutationsIndexed(set) {
    return Array(factorial(set.length)).fill().map(
        (_, i) => getItemFromOrderedPermutations(
            set, getPermutationSwitchIndex(set.length, i)
        )
    );
}

function getPermutationSwitchIndex(width, index) {
    if (index < 0 || index >= factorial(width)) throw new RangeError();

    let height = factorial(width) / width--;
    let offset = 0;

    while (width > 1) {
        const leftover = Math.floor(index / height);
        const odd = leftover % 2 === 1;
        offset += leftover * height;
        index %= height;
        if (odd) index = height - index - 1;
        height /= width--;
    }

    return index + offset;
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

// duplicate
function getItemFromOrderedPermutations(set, index) {
    if (index < 0 || index >= factorial(set.length)) throw new RangeError();

    let remainingSet = set.slice();
    let result = [];

    for (let i = set.length - 1; i >= 0; i--) {
        const quotient = Math.floor(index / factorial(i));

        result.push(remainingSet[quotient]);
        remainingSet.splice(quotient, 1);

        index %= factorial(i);
    }

    return result;
}

// duplicate
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

// duplicate
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
const fastestWay = measure(minimalSwitchPermutationsIndexed)(wiring);
const result = measure(checkPermutWaysDiff)(fastestWay);
console.log(result);
