/**
 * @template Value, NewValue
 * @param {Record<string, Value>} object
 * @param {(value: Value, key: string, index: number, object: Record<string, Value>) => NewValue} callback
 * @returns {Record<string, NewValue>}
 * 
 * @example
 * mapValues({ A: 1, B: 2, C: 3 }, (v, k, i) => [v, k, i].join(' '));
 * // { "A": "1 A 0", "B": "2 B 1", "C": "3 C 2" }
 */
export default function mapValues(object, callback) {
    return Object.fromEntries(Object.entries(object).map(([key, value], index) =>
        [key, callback(value, key, index, object)]
    ));
}
