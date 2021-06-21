import { addZeroToNumber } from '../../../../../utils/helpers';

export const validateDate = (value: string): Date => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return new Date();
    return date;
};

export const formatTime = (value: string): string => {
    const date = validateDate(value);
    return `${addZeroToNumber(date.getHours())}:${addZeroToNumber(date.getMinutes())}`;
};

export const createHTML = (value: string): string =>
    value
        .replace(
            /(\b(https?|):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi,
            '<a target="_blank" rel="noopener noreferrer" href="$1">$1</a>',
        )
        .replace(/(^|[^/])(www\.[\S]+(\b|$))/gim, '$1<a target="_blank" rel="noopener noreferrer" href="http://$2">$2</a>')
        .replace(/\n/gi, '<br>');
