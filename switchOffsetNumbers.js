const wiring = "ABCDE";
let width = wiring.length;
let height = factorial(width) / width--;
let index = 24;
let offset = 0;

console.log(permutation(wiring, index));

/* TODO
write all switches for each switching item
@24 #25 BACDE tff +23  0  0
@47 #48 BEDCA ttf -23 -5  0
@42 #43 BEACD ftt -14 +5  0
*/

while (width >= 2) {
    console.log(state());
    const leftover = Math.floor(index / height);
    const odd = leftover % 2 === 1;
    console.log({ odd });
    offset += leftover * height;
    index %= height;
    // console.log(state());
    if (odd) {
        const pair = offset + height - index - 1;
        console.log({ pair });
        console.log(permutation(wiring, pair));
        // index = pair;
    }
    height /= width--;
    if (odd) break;
}

console.log(state());

function state() {
    return { w: width, i: index, h: height, o: offset };
}

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function permutation(wiringString, i) {
    return getItemFromOrderedPermutations(Array.from(wiringString), i).join('')

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
}
