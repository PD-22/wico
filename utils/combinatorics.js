import { createObject } from "./general.js";

// NOTE: dictionary support util
export function combineDict(dictionary, generateMultipleValues) {
    return generateMultipleValues(Object.values(dictionary)).map(
        newValues => createObject(Object.keys(dictionary), newValues)
    );
}
