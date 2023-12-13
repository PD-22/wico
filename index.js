const dictionary = {
  Jack: { L: "Green", R: "Red", G: "Copper", M: "Blue" },
  Speakers: { L: "Green", R: "Red", G: "Copper" }
};

// permutate
for (const key in dictionary) {
  const value = dictionary[key];

  const set = Object.values(value);

  const result = [];
  const totalLength = Array.from(set, (_, i) => 1 + i).reduce((p, c) => p * c);

  for (let index = 0; index < totalLength; index++) {
    let indexCopy = index;
    let totalLengthCopy = totalLength;

    let length = set.length;
    totalLengthCopy /= length--;
    let offset = 0;

    while (length > 1) {
      const leftover = Math.floor(indexCopy / totalLengthCopy);
      const isOdd = leftover % 2 === 1;
      offset += leftover * totalLengthCopy;
      indexCopy %= totalLengthCopy;
      if (isOdd) indexCopy = totalLengthCopy - indexCopy - 1;
      totalLengthCopy /= length--;
    }

    let swappedIndex = indexCopy + offset;
    let totalLengthCopy2 = totalLength;

    let remainingSet = set.slice();
    let permutation = [];

    for (let i = set.length - 1; i >= 0; i--) {
      totalLengthCopy2 /= i + 1;
      const quotient = Math.floor(swappedIndex / totalLengthCopy2);
      permutation.push(...remainingSet.splice(quotient, 1));
      swappedIndex %= totalLengthCopy2;
    }

    result.push(permutation);
  }

  dictionary[key] = result.map(arr => Object.fromEntries(
    Object.keys(value).map((key, index) => [key, arr[index]])
  ));
}

// combine
const permutationValues = Object.values(dictionary);
const combinationValues = [];
const combinationsLength = permutationValues.reduce((acc, arr) => acc * arr.length, 1);
for (let index = 0; index < combinationsLength; index++) {
  let groupSize = combinationsLength;

  const newPermValue = permutationValues.map(array => {
    const combinationItemIndex = Math.floor(index * array.length / groupSize) % array.length;

    const minDiffCombinationItem = array[Math.floor(index / groupSize) % 2 === 1 ?
      array.length - 1 - combinationItemIndex :
      combinationItemIndex];

    groupSize /= array.length;

    return minDiffCombinationItem;
  });

  combinationValues.push(newPermValue);
}
const combinations = combinationValues.map(arr => Object.fromEntries(
  Object.keys(dictionary).map((key, index) => [key, arr[index]])
));

// format
const formatted = combinations.map((comb, index) =>
  `#${index + 1}:\n` + Object.entries(comb).map(([wiringName, wiring]) =>
    `${' '.repeat(2)}${wiringName}:\n` + Object.entries(wiring).map(([joint, wire]) => {
      const nextWire = combinations[index + 1]?.[wiringName]?.[joint];
      const nextWireText = (nextWire && wire !== nextWire) ? ` -> ${nextWire}` : '';
      return `${' '.repeat(4)}${joint} - ${wire}${nextWireText}`;
    }).join('\n')
  ).join('\n')
).join('\n') + '\n';

// print
require('fs').writeFileSync('output.txt', formatted);
