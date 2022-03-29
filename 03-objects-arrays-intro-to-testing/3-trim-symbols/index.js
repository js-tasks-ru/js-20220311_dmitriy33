/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

    if (size === 0) return '';
    if (size === undefined) return string;

    let count = 0;
    const result = [];

    for (const letter of string) {
        if (result[result.length - 1] === letter) {
            if (count < size) {
                result.push(letter);
                count += 1;
            }
        } else {
            count = 1;
            result.push(letter);
        }
    }

    return result.join('');

};
