# WICO (Wiring Combinations)
## History
### Problem
This was supposed to be a quick private project to try to fix my earphone by resoldering all the wires.
There was a need to generate all possible wiring combinations.
My earphones had 2 main components that were needed to be connected to the circuit: AUX audio connector jack and the earplug speakers.
* The jack had 4 wires (green, red, copper, blue) that connect to one side of the circuit with joints named (L: Left, R: Right, G: Ground, M: Microphone)
* The earphones had 3 wires combined (green, red, copper) that connect to the other side of the circuit with joints named (L: Left, R: Right, G: Ground)

  ![Earphone circuit wiring diagram](diagram.svg)
### Naive solution
The code did not take much time to write and produced a simple output:
```js
[
  {
    Circuit: { Blue: "G", Red: "M", Green: "R", Copper: "L" },
    Sound: { Red: "R", Copper: "G", Green: "L" }
  },
  {
    Circuit: { Blue: "G", Red: "M", Green: "R", Copper: "L" },
    Sound: { Red: "R", Copper: "L", Green: "G" }
  },
  // ... (122 more combinations)
]
```

I have counter the amount of resoldering I needed to perform by counting the difference between every combination which happened to be 392.

I got interested if there was a way to minimize the amount of work needed to be done.

After 2 weeks of researching, experimenting on a paper and updating my combinatorics functions I Have found a way to minimize the difference between every adjacent combination by 2 which is the lowest that is physically possible.

The new algorithm produced 106 less resoldering needed that equals to 286

---

After finding the sollution I have found my self refactoring my code over and over.
I got interested in improving my coding skills by making the code modular, readable, testable.

It took couple of months of what seemed like endlees refactoring that I got addicted to.
I have learned how to structure, group and divide my code; how to best extract parts of the code; how to write unit tests that are easy understand; how to extract common utility code and give them a good name.

(I have learned that nothing can be perfect and that I should only focus on the things that matter.
I am looking forward to programming usefull apps in the future efficiently by avoiding unnecessary distractions.)

---

The primary functionality of this project is built upon `combination` and `permutation` algorithms.

This combinatoric functions are used to create all possible combinations of wiring earphone components to the circuit.

## Table of Contents
- [Installation](#installation)
<!-- TODO -->

## Installation
1. Check if Node.js is installed:
   ```bash
   node --version
   ```
2. Clone the repository:
   ```bash
   git clone https://github.com/PD-22/wico.git
   ```

## Usage
1. Open the project folder:
   ```bash
   cd ./wico
   ```
2. Run the application:
   ```bash
   npm start
   ```
3. Expected output:
   ```text
   > wico@1.0.0 start   
   > node ./src/index.js
   
   Writing output to "output\wiring.txt"...
   DONE
   ```
4. Check the generated output in the specified location.
   ```txt
   #1:
     Jack:
       L - Green
       R - Red
       G - Copper
       M - Blue
     Speakers:
       L - Green
       R - Red -> Copper
       G - Copper -> Red
   ... (143 more combinations)
   ```
## What does it do
* The program generates all possible `combinations` by performing `permutations` on every `wire` and `joint` within the `wiring group`.
* Output displays the `wire` switching needed to transition between every `combination` using the arrows ("->").
## Purpose
* I wanted to check `all possible` combinations to rewire opened apart earphone.
![Earphone circuit wiring diagram](diagram.svg)
## How it works
* The program gets input from `settings` json object in the `src/index.js` file.
   ```js
   const settings = {
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
   };
   ```
* The `settings` object can contain any amount of `wiring groups`, `wires` and `joints`.
* The type of the `settings` object is `Record<string, <Record<string, string>>`.

<!-- TODO -->
* The current `wirings` object containts `wire groups` for earphone audio jack and speakers that should be connected to the circuit.
* Each `wiring group` contains key-value pair of `wire` and `joint` that can be soldered together.

## Optimization
I wrote a program to produce all `combinations` of wiring by minimizing `resoldering` needed as much as possible.

For wiring settings with `4` wirings in the `audio jack` and `3` wirings in `the speakers` there would be `((4! * 3!) - 1) * 2 = 286` amount of resoldering needed to try all combinations with minimum amount of soldering possible.

* `4! * 3! = 144` is amount of combinations.
* `144 - 1 = 143` is amount of transitions between combinations.
* `143 * 2 = 286` is amount of resoldering required to transition between all combinations.

Multiplication by `2` accurs because of switching 2 `wires` with places.

### Without optimization
In unoptimized version for the same input of `4` and `3` wirings `106` more resoldering is needed to transition between all of the combinations `286 + 106 = 392`.

That is because the maximum of `wire` switching (resoldering) to transition between combinations was not the physicaly lowest possible of `2` but it could go up to `6`.

## File Structure
### src
`src` folder contains `index.js` that is the main entry for the app and is used to generate wiring combinations.

`formatWiring.js` is used to make the output generated in `index.js` more readable and highlight the wire switching between every combination.

`src` also contains functions for `combinatorics` calculation: `combinations, combinationsOptimization, permutations, permutationsOptimization`

### utils
`utils` folder contains simple utility functions
* Iterating over objects: `forEachAdjacent, map, mapValues`
* Math: `factorial, product`
* Formatting: `indent, lines`
* Other: `countListDiff`, `range`

### test
`test` folder contains all test files for almost every file that exports a function including `utils`, `combinatorics` files in the [`src`](#testing) folder and some from the `debug` folder.

For more information about go to [Testing](#testing)

### debug
`debug` folder contains methods for testing.
* `assertion` files to test expected output: `simpleAssert, captureConsole, assertFileContent, normalizeEOL`
* `timing` files to set time and display progress bar: `getDeltaTime, createProgressBar, simulateProgress`
* `testCombinatoricsPerformance` file containing multiple functions for testing combinatorics

### output
`output` is an ignored folder in git that is used for storing temporary `txt` files for tests

## Testing
It is possible use the following `bash` command to run all the files in the test folder:
```bash
find ./test/ -type f -name "*.js" -exec bash -c 'cmd="node {}"; echo "$cmd"; $cmd' \;
```

### A single test
1. Command:
   ```bash
   node ./test/combinations/array.js
   ```
2. Success output:
   ```txt
   PASS
   ```
3. Failure output:
   ```txt
   FAIL: Expected values to be strictly deep-equal:
   + actual - expected ... Lines skipped
   
     [
       [
   ...
         30,
         300
   +   ],
   +   [
   +     1,
   +     10,
   +     100
       ]
     ]
   ```

### Multiple tests with descriptions
1. Command:
   ```bash
   node ./test/indent.js
   ```
2. Success output:
   ```txt
   PASS: easy
   PASS: newline middle
   PASS: double newline middle
   PASS: start newline
   PASS: start newline whitespace        
   PASS: start newline whitespace newline
   PASS: start whitespace newline        
   PASS: end newline
   PASS: end newline whitespace
   PASS: end newline whitespace newline  
   PASS: end whitespace newline
   PASS: start lines whitespace
   ```
3. Failure output:
   ```txt
   PASS: easy
   PASS: newline middle
   FAIL: double newline middle: Expected values to be strictly equal:
   + actual - expected
   
   + 'One\nTwo\nThree'
   - '-One\n\n\n-Two\n-Three'
   PASS: start newline
   PASS: start newline whitespace
   PASS: start newline whitespace newline
   PASS: start whitespace newline
   PASS: end newline
   PASS: end newline whitespace
   PASS: end newline whitespace newline
   PASS: end whitespace newline
   PASS: start lines whitespace
   ```

### Combinatorics performance
1. Command:
   ```bash
   node ./test/combinationsOptimization/performance.js
   ```
2. Success output:
   ```txt
   getMinDiffCombinations...
   Progress: [====================]
   1363 ms
   Writing output to "output\combinationsOptimization.txt"...
   DONE
   Assert combinatorics optimization...
   PASS
   Assert file Content "output\combinationsOptimization-backup.txt"...
   PASS
   ```
3. Some adjacent combinations did not have expected minimum difference of 1:
   ```txt
   ... (some lines are skipped)
   
   Assert combinatorics optimization...
   FAIL: Expected values to be strictly equal:
   
   2 !== 1
   ```
4. The file for comparing output was not found:
   ```txt
   ... (some lines are skipped)
   
   Assert file Content "output\combinationsOptimization-backups.txt"...
   NOT FOUND
   ```
5. Output did not match contents of the comparison file:
   ```txt
   ... (some lines are skipped)
   
   Assert file Content "output\combinationsOptimization-backup.txt"...
   FAIL: File content does not match
   ```
