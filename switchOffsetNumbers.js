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

const wiring = Array.from("ABCDEFGHIJ");
const fastestWay = measure(minimalSwitchPermutationsIndexed)(wiring);
const result = measure(checkPermutWaysDiff)(fastestWay);
console.log(result);
