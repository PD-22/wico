# WICO (Wiring Combinations)

### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [History](#history)
  - [Origin](#origin)
  - [Naive Solution](#naive-solution)
  - [Optimized Solution](#optimized-solution)
  - [Journey of Improvement](#journey-of-improvement)
- [Internals](#internals)
   - [File Structure](#file-structure)
   - [How it Works](#how-it-works)

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

## History

### Origin

This started as a quick private project to fix my earphones by resoldering the wires. The challenge was to generate all possible wiring combinations.

My earphones had two main components requiring connection to the circuit:

1. The AUX audio connector jack had 4 wires - green, red, copper, blue - connecting to one side of the circuit with joints named: Left, Right, Ground, Microphone.

2. The pair of speakers had 3 wires combined - green, red, copper - connecting to the other side of the circuit with joints named: Left, Right, Ground.

![Earphone Circuit Wiring Diagram](diagram.svg)

### Naive Solution

The initial version of the code, totaling 50 lines, produced a simple JSON output consisting of 124 possible wiring combinations:

```javascript
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

### Optimized Solution

To enhance efficiency, I calculated the required resoldering by summing up differences between each combination, totaling 392.

Motivated to minimize the workload, I spent two weeks researching, experimenting by writing down thoughts on a piece of paper, updating my combinatorics functions, and testing. I developed an algorithm to reduce the difference between every adjacent combination by 2—the minimum physically achievable.

This new algorithm resulted in a reduction of 106 in required resoldering, bringing the total down to 286.

### Journey of Improvement

After discovering the solution, I found myself immersed in a continuous cycle of code refactoring. I became interested in improving my skills by creating modular, readable, and testable code.

This journey spanned a couple of months, filled with what felt like endless refactoring sessions. During this time, I had to adjust the structure, group and divide components, extract code segments, write comfortable unit tests, and give meaningful names to common utility functions.

It felt like there were almost unlimited ways to solve programming problems and write code. I learned that perfection is not possible, and there are always some tradeoffs.

I should focus on the things that matter. My goal is to efficiently write useful programs in the future while avoiding unnecessary distractions.

## Internals

### File Structure

* `src`
  * `index.js`
     * The main entry for the app used to generate wiring combinations.
  * `formatWiring.js`
     * Used to make the output generated in `index.js` more readable and highlight the wire switching between every combination.
  * `combinatorics` functions in `src`
     * `combinations`
     * `combinationsOptimization`
     * `permutations`
     * `permutationsOptimization`

* `utils`
   * Iterating over objects: `forEachAdjacent`, `map`, `mapValues`
   * Math: `factorial`, `product`
   * Formatting: `indent`, `lines`
   * Other: `countListDiff`, `range`

* `test`
  * Contains tests for `src`, `utils`, `debug`.
  * For more information, go to [Testing](#testing)

* `debug`
   * Contains utilities for testing.
   * `assertion` files to test expected output: `simpleAssert`, `captureConsole`, `assertFileContent`, `normalizeEOL`
   * `timing` files to set time and display progress bar: `getDeltaTime`, `createProgressBar`, `simulateProgress`
   * `testCombinatoricsPerformance` file containing multiple functions for testing combinatorics

* `output`
   * Ignored folder in git used for storing temporary `txt` files for tests

### How it Works <!-- TODO -->
The primary functionality of this project is built upon `combination` and `permutation` algorithms.

This combinatoric functions are used to create all possible combinations of wiring earphone components to the circuit.

The program gets input from `settings` json object in the `src/index.js` file.
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

* The current `wirings` object containts `wire groups` for earphone audio jack and speakers that should be connected to the circuit.
* Each `wiring group` contains key-value pair of `wire` and `joint` that can be soldered together.

---

For wiring settings with `4` wirings in the `audio jack` and `3` wirings in `the speakers` there would be `((4! * 3!) - 1) * 2 = 286` amount of resoldering needed to try all combinations with minimum amount of soldering possible.

* `4! * 3! = 144` is amount of combinations.
* `144 - 1 = 143` is amount of transitions between combinations.
* `143 * 2 = 286` is amount of resoldering required to transition between all combinations.

Multiplication by `2` accurs because of switching 2 `wires` with places.
