import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

import { IAuth, ICategories, IDropList, IDropValue } from '../interfaces';
import months from './months';
import routes from './routes';

/**
 * NAVIGATION
 * 1. Validation
 * 2. Value formatting
 * ├─ 2.1 Number formatting
 * └─ 2.2 Date formatting
 * 3. From lodash
 * 4. Work with cookies
 * 5. Site related helpers
 * ├─ 5.1 Production logs
 * ├─ 5.2 Transform category list for dropdowns
 * ├─ 5.3 SSR auth helpers
 * ├─ 5.4 Online indicator
 * └─ 5.5 Time indicator
 */

// ----------------------------------------------
// ----------------------------------------------
//  1. Validation
// ----------------------------------------------
// validation regex
export const mailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{6,}$/;
// check if string is valid number
export const intNumberValidation = (text: string): boolean => {
    if (text === '') return false;
    return !/^\d{1,10}$/.test(text);
};
// check empty fields in object (useful for form validation)
export const isEmpty = <T>(value: T): [string, string][] =>
    Object.entries(value).filter((item: [string, string]): boolean => !item[1].trim());

// ----------------------------------------------
// ----------------------------------------------
//  2. Value formatting
//  └─ 2.1 Number formatting
// ----------------------------------------------
// add zero to decimals. 2 => '02', 12 => '12'
export const addZeroToNumber = (value: string | number): string => String(value).padStart(2, '0');
// transform init value to string with separators. 1000000 => 1 000 000, 90 => 90
export const moneyFormat = (value: number | string = 0, separator = '   '): string => {
    if (!value) return '';
    return String(value)
        .split('')
        .reverse()
        .map<string>((item, index): string => (index % 3 ? item : item + separator))
        .reverse()
        .join('')
        .trim();
};
// declines words according to number. 1 день 2 дня 5 дней ...
export const declOfNum = (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

// ----------------------------------------------
// ----------------------------------------------
//  2. Value formatting
//  └─ 2.2 Date formatting
// ----------------------------------------------
// date from string
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

// format date string from timestamp or valid date string.
// 'Fri Mar 12 2021 10:51:16 GMT+0200 (Eastern European Standard Time)' => 12-03-2021 10:51
// 'Fri Mar 12 2021 10:51:16 GMT+0200 (Eastern European Standard Time)' => 12 March 2021 10:51
// @param {string[]} month array with translated months
export const formatTimestamp = (value?: string | number | Date | null, locale = 'ru'): string => {
    const date = dateFromTimestamp(value);
    if (!date) return ' - ';
    return `${months[locale][date.getMonth()]} ${addZeroToNumber(date.getDate())}, ${date.getFullYear()} ${addZeroToNumber(
        date.getHours(),
    )}:${addZeroToNumber(date.getMinutes())}`;
};

// ----------------------------------------------
// ----------------------------------------------
//  3. From lodash
// ----------------------------------------------
// Creates a throttled function that only invokes `func` at most once per every `time` milliseconds.
type IFunction = (...args: unknown[]) => void;
export const throttle = (func: IFunction, time = 0): IFunction => {
    let timeout = true;
    return (...args) => {
        if (timeout) {
            timeout = false;
            setTimeout(() => {
                timeout = true;
                func(...args);
            }, time);
        }
    };
};

// ----------------------------------------------
// ----------------------------------------------
//  4. Work with cookies
// ----------------------------------------------
// Parse cookie on server. Generate valid js object from cookies string
export const parseCookie = <T>(value = '', key = 'phoqer_auth', parsed = false): T | null => {
    try {
        return parsed ? cookie.parse(value)[key] || null : JSON.parse(cookie.parse(value)[key]);
    } catch (error) {
        return null;
    }
};

// ----------------------------------------------
// ----------------------------------------------
//  5. Site related helpers
//  └─ 5.1 Production logs
// ----------------------------------------------
// custom console log for site identity
export const logger = (): void => {
    if (process.env.NODE_ENV === 'production' && process.browser) console.clear();
    console.log(
        '%c Phoqer %c v0.0.1 Made with love ...',
        'padding: 6px 15px; border-radius: 10px; background: #eee; text-transform: uppercase; color: #007aff; font-size: 1rem; font-weight: 600; font-family: Montserrat, sans-serif',
        'color: #DB162F; font-size: 0.8rem;',
    );
    console.log('%c Coming soon... The website is under construction', 'font-size: 1.2rem;');
};

// ----------------------------------------------
// ----------------------------------------------
//  5. Site related helpers
//  └─ 5.2 Work with categories list
// ----------------------------------------------
// format category list from backend in relation to IDropList interface
export const formatCatList = (data: ICategories[]): IDropList[] =>
    data?.map<IDropList>(
        (item: ICategories): IDropList => (item?.sub_category?.length ? { ...item, sub: item.sub_category } : item),
    );
// find category by slug
type Dropdown = ICategories | IDropList | IDropValue;
export const findCategory = (data: Dropdown[], slug: string): Dropdown | null => {
    const category: Dropdown | undefined = data.find(item => item.slug === slug);
    return category || null;
};
// find sub category by slug
export const findSubCategory = (data: ICategories[], slug: string): Dropdown | null => {
    const categories: ICategories[] = data.filter(item => item.sub_category?.[0]);
    let subCategory;
    if (categories.length) {
        for (const cat of categories) {
            subCategory = cat.sub_category?.find(item => item.slug === slug);
            if (subCategory) break;
        }
    }
    return subCategory || null;
};

// ----------------------------------------------
// ----------------------------------------------
//  5. Site related helpers
//  └─ 5.3 SSR auth helpers
// ----------------------------------------------
// get server side cookies in next.js getServerSideProps function
export const serverCookie = (ctx: GetServerSidePropsContext): IAuth | null => parseCookie<IAuth | null>(ctx.req.headers.cookie);
// redirect user in next.js getServerSideProps function
export const serverRedirect = (ctx: GetServerSidePropsContext, path?: string | null, reverse = false): boolean => {
    const auth = serverCookie(ctx);
    const redirect = reverse ? auth?.access_token : !auth?.access_token;
    if (redirect) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', path || routes.root);
    }
    return !!redirect;
};

// ----------------------------------------------
// ----------------------------------------------
//  5. Site related helpers
//  └─ 5.4 Online indicator
// ----------------------------------------------
// generate user online status
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

// ----------------------------------------------
// ----------------------------------------------
//  5. Site related helpers
//  └─ 5.4 Time indicator
// ----------------------------------------------
export const timeIndicator = ({ initDate, locale = 'ru' }: IOnlineStatusParams): string => {
    const date = dateFromTimestamp(initDate);
    if (!date) return ' - ';

    const dif = Date.now() - +date;
    if (dif > HOUR_IN_MS) return formatTimestamp(date, locale);

    const minutes = Math.ceil(dif / 60000);
    return `${minutes} ${declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад`;
};
