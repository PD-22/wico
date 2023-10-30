import unzip from "../utils/unzip.js";
import zip from "../utils/zip.js";

export function getDictCombinatorics(dict, getCombinatorics) {
    const [keys, values] = unzip(Object.entries(dict));
    return getCombinatorics(values).map(newValues => Object.fromEntries(zip(keys, newValues)));
}
