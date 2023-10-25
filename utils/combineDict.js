import createObject from "../utils/createObject.js";
import unzip from "./unzip.js";

// NOTE: combinations dictionary support util
export default function combineDict(dictionary, getValuesList) {
    const [keys, values] = unzip(Object.entries(dictionary));
    return getValuesList(values).map(newValues => createObject(keys, newValues));
}
