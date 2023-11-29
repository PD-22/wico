/**
 * @param {number} total
 * @param {number} width
 * @returns {{ increment: () => void; reset: () => void; }}
 */
export default function createProgressBar(total, width) {
    let state = initState();

    return { increment, reset };

    function increment() {
        if (state.overflow) return;
        state.completed++;

        if (state.completed > total) {
            state.overflow = true;
            console.warn('Progress bar overflow!\n');
            return;
        }

        const progressWidth = Math.floor(state.completed * width / total);

        if (progressWidth === state.prevProgressWidth) return;

        process.stdout.write(`\rProgress: [${'='.repeat(progressWidth)}${' '.repeat(width - progressWidth)}]`);

        state.prevProgressWidth = progressWidth;

        if (state.completed === total) process.stdout.write(`\n`);
    }

    function reset() {
        state = initState();
    }

    function initState() {
        return {
            completed: 0,
            prevProgressWidth: -1,
            overflow: false
        }
    }
}
