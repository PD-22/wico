import forEachAdjacents from "./forEachAdjacents.js";

forEachAdjacents([1, 2, 3, 4, 5], (v1, v2, i1, i2) => {
    if (v1 + v2 === 7) console.log(i1, i2); // 2 3
});
