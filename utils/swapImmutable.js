import swap from "./swap.js";

export default function swapImmutable(arr, i, j) {
    return swap(arr.slice(), i, j);
}
