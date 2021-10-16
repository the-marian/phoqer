// generate user online status
import { dateFromTimestamp, declOfNum, formatTimestamp } from '../helpers';

const FIVE_MINUTES_IN_MS = 300000;
const HOUR_IN_MS = 3600000;

interface IOnlineStatusParams {
    initDate?: Date | string | number | null;
    locale?: string;
    isAuthor?: boolean;
}

export const onlineStatus = ({ initDate, locale = 'ru', isAuthor = false }: IOnlineStatusParams): string => {
    const date = dateFromTimestamp(initDate);
    if (!date) return ' - ';

    const isOnline = (date && Date.now() - +date < FIVE_MINUTES_IN_MS) || isAuthor;
    const dif = Date.now() - +date;
    if (dif > HOUR_IN_MS) return formatTimestamp(date, locale);

    const minutes = Math.floor(dif / 60000);
    return isOnline ? 'online' : `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
};

export const timeIndicator = ({ initDate, locale = 'ru' }: IOnlineStatusParams): string => {
    const date = dateFromTimestamp(initDate);
    if (!date) return ' - ';

    const dif = Date.now() - +date;
    if (dif > HOUR_IN_MS) return formatTimestamp(date, locale);

    const minutes = Math.ceil(dif / 60000);
    return `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
};
