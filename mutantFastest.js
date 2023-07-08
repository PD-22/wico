function generatePermutations(input) {
    const result = [];    
    recursion([], input);
    return result;

    function recursion(accumulator, variants) {
        if (!variants.length) {
            result.push(accumulator);
            return;
        }

        variants.forEach((target, index) => {
            const next = [...accumulator, target];
            const rest = variants.filter((_, i) => i !== index);
            recursion(next, rest);
        })
    }
}

function checkPermutWaysDiff(arr) {
    const list = arr.map((v, i) => {
        const v2 = arr[i + 1];
        return v2 ? calcListDiff(v, v2) : 0;

        function calcListDiff(arr1, arr2) {
            let count = 0;
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) count++;
            }
            return count;
        }
    });

    const diff = list.reduce((a, b) => a + b);
    const minDiff = getMinDiff(arr[0].length);
    return diff === minDiff;

    function getMinDiff(length) {
        return 2 * (factorial(length) - 1);

        function factorial(num) {
            if (num < 0)
                return -1;
            else if (num == 0)
                return 1;
            else
                return (num * factorial(num - 1));
        }
    }
}

// all permutations of a set using a single switch of pair items
function mutantFastest(wiring) {
    console.log('generate permutations...');
    const result = generatePermutations(wiring);

    console.log('optimize permutations...');
    recurse(0, factorial(wiring.length - 1), wiring.length);

    return result;

    function recurse(startOffset, size, amount) {
        if (amount <= 2) return;
        for (let i = 0; i < amount; i++) {
            const start = startOffset + (size * i);
            const end = start + size;
            const newAmount = amount - 1;
            recurse(start, size / newAmount, newAmount);
            if (i % 2) reverseRange(result, start, end);
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

    function factorial(num) {
        if (num < 0)
            return -1;
        else if (num == 0)
            return 1;
        else
            return (num * factorial(num - 1));
    }
};

const startTime = performance.now();
const wiring = Array.from("ABCDEFGH");
const fastestWay = mutantFastest(wiring);
const result = checkPermutWaysDiff(fastestWay);
console.log(`time spent: ${Math.floor(performance.now() - startTime)} ms`);
console.log(`success: ${result}`);
