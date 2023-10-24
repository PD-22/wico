import transformObject from "./transformObject.js";

export default function mapValues(obj, callback) {
    if (Array.isArray(obj)) return obj.map((value, index) =>
        callback(value, index, index, obj)
    );

    return transformObject(obj, (value, key, index) =>
        [key, callback(value, key, index, obj)]
    );
}
