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

function checkPermutWaysDiff(arr) {
    if (!allItemsAreUniqueByJSON(arr)) throw new Error(`arr items not unique`);

    const list = arr.map((v, i) => {
        const v2 = arr[i + 1];
        const d = v2 ? calcListDiff(v, v2) : 0;
        return { v, d };

        function calcListDiff(arr1, arr2) {
            let count = 0;
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) count++;
            }
            return count;
        }
    });

    const diff = list.map(x => x.d).reduce((a, b) => a + b);
    const minDiff = getMinDiff(arr[0].length);
    const success = diff === minDiff;

    return { success, list, diff, minDiff };

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

    function allItemsAreUniqueByJSON(arr) {
        return arr.every(
            (v, i) => !arr
                .filter((_, i2) => i !== i2)
                .some(v2 => JSON.stringify(v) === JSON.stringify(v2))
        )
    }
}

// all permutations of a set using a single switch of pair items
function mutantFastest(wiring) {
    const permutations = generatePermutations(wiring);
    const groupTree = prepareAllTheGroupings(permutations);

    return recursion(groupTree, wiring.length - 2);

    function recursion(group, depth) {
        if (depth <= 0) return group;
        return group.flatMap((childGroup, groupIndex) => {
            const result = recursion(childGroup, depth - 1);
            return groupIndex % 2 ? result.toReversed() : result;
        });
    }

    function prepareAllTheGroupings(wordPerms) {
        return recursion(wordPerms, 1);

        function recursion(currentGroup, index) {
            if (currentGroup.length <= 2) return currentGroup;

            const groups = groupPermutationsStartingWith(currentGroup, index);

            return groups.map(group => recursion(group, index + 1));
        }

        function groupPermutationsStartingWith(permList, depth = 1) {
            const groups = [];

            const segment = x => x.slice(0, depth);

            const segmentChanged = i => {
                const perm = permList[i];
                const prevPerm = permList[i - 1];
                return !compareArrays(segment(perm), segment(prevPerm));

                function compareArrays(arr1, arr2) {
                    const str1 = JSON.stringify(arr1);
                    const str2 = JSON.stringify(arr2);

                    return str1 === str2;
                }
            };

            for (let i = 0; i < permList.length; i++) {
                const perm = permList[i];
                if (i === 0 || segmentChanged(i)) groups.push([]);
                last(groups).push(perm);

                function last(arr) {
                    return arr[arr.length - 1];
                }
            }

            return groups;
        }
    }
}

const wiring = Array.from("ABCD");
const fastestWay = mutantFastest(wiring);
const result = checkPermutWaysDiff(fastestWay);
console.log(result);
