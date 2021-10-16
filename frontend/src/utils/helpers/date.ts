import { addZeroToNumber } from '../helpers';
import months from '../months';

export const dateFromTimestamp = (value?: string | number | null | Date): Date | null => {
    try {
        if (!value) throw new Error();
        const date = new Date(value);
        if (!date.getDate()) throw new Error(); // for invalid date
        return date;
    } catch (error) {
        return null;
    }
};

export const addMonthToDate = (amount = 1): Date => {
    const today = new Date();
    return new Date(today.setMonth(today.getMonth() + amount));
};

// format date string from timestamp or valid date string.
// 'Fri Mar 12 2021 10:51:16 GMT+0200 (Eastern European Standard Time)' => 12-03-2021 10:51
// 'Fri Mar 12 2021 10:51:16 GMT+0200 (Eastern European Standard Time)' => 12 March 2021 10:51
// @param {string[]} month array with translated months
export const formatTimestamp = (value?: string | number | Date | null, locale = 'ru'): string => {
    const date = dateFromTimestamp(value);
    if (!date) return ' - ';
    return `${months[locale][date.getMonth()]} ${addZeroToNumber(date.getDate())}, ${date.getFullYear()}${
        typeof value !== 'string' || value?.length > 10
            ? ' ' + addZeroToNumber(date.getHours()) + ':' + addZeroToNumber(date.getMinutes())
            : ''
    }`;
};
