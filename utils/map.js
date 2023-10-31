export default function map(object, callbackfn) {
    return Object.entries(object).map(([key, value], index) =>
        callbackfn(value, key, index, object)
    );
}
