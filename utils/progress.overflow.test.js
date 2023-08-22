const { createProgressBar } = require("./debug");

const num = 20;

const progress = createProgressBar(num, num);

for (let i = 0; i < num; i++) progress.increment();

progress.increment(); // warn: "Progress bar overflow!"
