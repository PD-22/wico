import rangeGenerator from "./rangeGenerator.js";

export default function range(start, end, step) {
    return Array.from(rangeGenerator(start, end, step));
}
