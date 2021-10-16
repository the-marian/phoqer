// add zero to decimals. 2 => '02', 12 => '12'
export const addZeroToNumber = (value: string | number): string => String(value).padStart(2, '0');
// transform init value to string with separators. 1000000 => 1 000 000, 90 => 90
export const moneyFormat = (value: number | string = 0, separator = ' '): string => {
    if (!value) return '';
    const data = String(value).split('.');
    let result = data[0]
        .split('')
        .reverse()
        .map<string>((item, index): string => (index % 3 ? item : item + separator))
        .reverse()
        .join('')
        .trim();

    if (result.length && result[result.length - 1] === separator) result = result.slice(0, result.length - 1);

    return result + '.' + (data[1] ? (data[1].length > 1 ? data[1].slice(0, 2) : data[1] + '0') : '00');
};
// declines words according to number. 1 день 2 дня 5 дней ...
export const declOfNum = (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};
