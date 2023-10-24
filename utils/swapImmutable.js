import swap from "./swap";

export default function swapImmutable(arr, i, j) {
    return swap(arr.slice(), i, j);
}
