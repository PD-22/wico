import zip from "./zip.js";

export default function createObject(keys, values) {
    return Object.fromEntries(zip(keys, values));
}
