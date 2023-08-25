import { createProgressBar } from "./debug.js";

const num = 20;

const progress = createProgressBar(num, num);

for (let i = 0; i < num; i++) progress.increment();

progress.increment(); // NOTE: should print "Progress bar overflow!"
