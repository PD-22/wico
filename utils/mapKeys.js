import transformObject from "./transformObject";

export default function mapKeys(obj, callback) {
    return transformObject(obj, (value, key, index) =>
        [callback(value, key, index, obj), value]
    );
}
