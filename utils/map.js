/**
 * @template Value, NewValue
 * @param {Record<string, Value>} object
 * @param {(value: Value, key: string, index: number, object: Record<string, Value>) => NewValue} callbackfn
 * @returns {Array<NewValue>}
 */
export default function map(object, callbackfn) {
    return Object.entries(object).map(([key, value], index) =>
        callbackfn(value, key, index, object)
    );
}
