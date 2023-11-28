/**
 * @template Value, NewValue
 * @param {Record<string, Value>} object
 * @param {(value: Value, key: string, index: number, object: Record<string, Value>) => NewValue} callbackfn
 * @returns {Array<NewValue>}
 * 
 * @example
 * map({ a: 1, b: 2, c: 3 }, (v, k, i) => [v, k, i].join(' '));
 * // ["1 a 0", "2 b 1", "3 c 2"]
 */
export default function map(object, callbackfn) {
    return Object.entries(object).map(([key, value], index) =>
        callbackfn(value, key, index, object)
    );
}
