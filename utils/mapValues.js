/**
 * @template Value, NewValue
 * @param {Record<string, Value>} object
 * @param {(value: Value, key: string, index: number, object: Record<string, Value>) => NewValue} callback
 * @returns {Record<string, NewValue>}
 */
export default function mapValues(object, callback) {
    return Object.fromEntries(Object.entries(object).map(([key, value], index) =>
        [key, callback(value, key, index, object)]
    ));
}
