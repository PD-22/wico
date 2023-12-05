# Description
Purpose of the project was to learn how to `refactor` code multiple times, make it modular, readable, testable and stop my endless perfectionism `addiction`.

## Real life problem
I wanted to check `all possible` combinations to rewire opened apart earphone.

I had to connect earphones audio jack `(aux)` and earbuds `(sound)` to the earphones `circuit`.

### Wiring settings
```js
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
};
```
![Earphone circuit wiring diagram](diagram.svg)

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

# Solution
The code is very general and can work on any amount of `wires` and `joints`.

To run the program you have to use `npm start` that will run `node src/index.js` and generate output in `output/wiring.txt`.

### Wiring settings
* The program will use `wiringSettings` json object to generate wiring combinations.
* wiringSettings type `Record<string, <Record<string, string>>`
* The object contains all the `wirings` (aux, sound) that are needed to be connected to the circuit.
* Each `wiring` contains key-value pair of `wire` and `joint` that can be soldered together.

### Example
`src/index.js`
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

`output/wiring.txt:`
```
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
#2:
  Jack:
    L - Green
    R - Red
    G - Copper
    M - Blue
  Speakers:
    L - Green -> Red
    R - Copper
    G - Red -> Green
... (142 more combinations)
```
