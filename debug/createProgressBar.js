export default function createProgressBar(total, width) {
    let completed, prevProgressWidth, overflow;

    init();

    return { increment, reset };

    function increment() {
        if (overflow) return;
        completed++;

        if (completed > total) {
            overflow = true;
            console.warn('Progress bar overflow!\n');
            return;
        }

        const progressWidth = Math.floor(completed * width / total);

        if (progressWidth === prevProgressWidth) return;

        process.stdout.write(`\rProgress: [${'='.repeat(progressWidth)}${' '.repeat(width - progressWidth)}]`);

        prevProgressWidth = progressWidth;

        if (completed === total) process.stdout.write(`\n`);
    }

    function reset() {
        init();
    }

    function init() {
        completed = 0;
        prevProgressWidth = -1;
        overflow = false;
    }
}
