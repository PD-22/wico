import assert from "assert";
import simpleAssert from "../debug/simpleAssert.js";
import formatWiring from "../src/formatWiring.js";

const input = [
  {
    Jack: { L: "Green", R: "Red", G: "Copper", M: "Blue" },
    Speakers: { L: "Green", R: "Red", G: "Copper" }
  },
  {
    Jack: { L: "Green", R: "Red", G: "Copper", M: "Blue" },
    Speakers: { L: "Green", R: "Copper", G: "Red" }
  }
];

const expected = `#1:
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
    L - Green
    R - Copper
    G - Red
`;

simpleAssert(() => assert.strictEqual(formatWiring(input), expected));
