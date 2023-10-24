import createObject from "../utils/createObject.js";

// NOTE: combinations dictionary support util
export default function combineDict(dictionary, getValuesList) {
    const values = Object.values(dictionary);
    const valuesList = getValuesList(values);

    return valuesList.map(newValues => {
        const keys = Object.keys(dictionary);
        return createObject(keys, newValues);
    });
}
