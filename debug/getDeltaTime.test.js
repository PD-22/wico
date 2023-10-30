import getDeltaTime from "./getDeltaTime.js";

const [deltaTime, result] = getDeltaTime(() => {
    let sum = 0;
    for (let i = 0; i < 100000000; i++) sum += i;
    return sum;
});

console.log(result, `${deltaTime.toFixed()} ms`);
