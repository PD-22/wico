require('fs').writeFileSync(
  'output.txt',
  formatWiring(
    getMinDiffDictCombinations(
      mapValues(
        {
          Jack: {
            L: "Green",
            R: "Red",
            G: "Copper",
            M: "Blue"
          },
          Speakers: {
            L: "Green",
            R: "Red",
            G: "Copper"
          }
        },
        getMinDiffDictPermutations
      )
    )
  )
);

function getMinDiffDictPermutations(setDict) {
  const set = Object.values(setDict);

  const result = [];
  const totalLength = factorial(set.length);

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

    const setCopy123 = set;
    let swappedIndex = indexCopy + offset;
    let totalLengthCopy123 = totalLength;

    let remainingSet = setCopy123.slice();
    let permutation = [];

    for (let i = setCopy123.length - 1; i >= 0; i--) {
      totalLengthCopy123 /= i + 1;
      const quotient = Math.floor(swappedIndex / totalLengthCopy123);
      permutation.push(...remainingSet.splice(quotient, 1));
      swappedIndex %= totalLengthCopy123;
    }

    result.push(permutation);
  }

  return result.map(arr => mapValues(setDict, (_v, _k, i) => arr[i]));
}

function getMinDiffDictCombinations(arraysDict) {
  const arraysValues = Object.values(arraysDict);

  const result = [];

  const combinationsLength = product(arraysValues.map(x => x.length));
  for (let index = 0; index < combinationsLength; index++) {
    let groupSize = combinationsLength;

    result.push(arraysValues.map(array => {
      const combinationItemIndex = Math.floor(index * array.length / groupSize) % array.length;

      const minDiffCombinationItem = array[Math.floor(index / groupSize) % 2 === 1 ?
        array.length - 1 - combinationItemIndex :
        combinationItemIndex];

      groupSize /= array.length;

      return minDiffCombinationItem;
    }));
  }

  return result.map(arr => mapValues(arraysDict, (_v, _k, i) => arr[i]));
}

function formatWiring(combList) {
  return lines(...combList.map((comb, index) => lines(
    `#${index + 1}:`,
    indent(lines(...map(comb, (wiring, wiringName) => lines(
      `${wiringName}:`,
      indent(lines(...map(wiring, (wire, joint) => {
        const nextWire = combList[index + 1]?.[wiringName]?.[joint];
        return `${joint} - ${wire}${(nextWire && wire !== nextWire) ? ` -> ${nextWire}` : ''}`;
      })))
    ))))
  ))) + '\n';
}

function product(numbers) {
  return numbers.reduce((product, number) => product * number, 1);
}

function mapValues(object, callback) {
  return Object.fromEntries(Object.entries(object).map(([key, value], index) =>
    [key, callback(value, key, index, object)]
  ));
}

function map(object, callbackfn) {
  return Object.entries(object).map(([key, value], index) =>
    callbackfn(value, key, index, object)
  );
}

function lines(...stringList) {
  return stringList.join('\n');
}

function indent(text, indentation = '  ') {
  return text.replaceAll(
    /(^|\n)(?=.*?\S.*?(\n|$))/g,
    (_match, newline) => (newline ? '\n' : '') + indentation
  );
}

function forEachAdjacents(array, callback) {
  return array.forEach((v2, i2) => {
    if (i2 === 0) return;
    const i1 = i2 - 1;
    const v1 = array[i1];
    return callback(v1, v2, i1, i2, array);
  });
}

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function countListDiff(arr1, arr2) {
  let count = 0;
  const maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i++)
    if (arr1[i] !== arr2[i]) count++;
  return count;
}
