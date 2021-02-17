import { ICategories, IDropList } from '../interfaces';

export const addZeroToNumber = (value: string | number): string => String(value).padStart(2, '0');

export const numberValidation = (text: string): boolean => {
    if (text === '') return false;
    return !/^\d{1,10}$/.test(text);
};

// format category list from backend
export const formatCatList = (data: ICategories[]): IDropList[] =>
    data?.map(
        (item: ICategories): IDropList =>
            item.sub_categories ? { name: item.name, slug: item.slug, sub: item.sub_categories } : item,
    );

// find category
export const findCategory = (data: ICategories[], slug: string): IDropList | null => {
    const category: ICategories | undefined = data.find(item => item.slug === slug);
    return category || null;
};

// find sub category
export const findSubCategory = (data: ICategories[], slug: string): IDropList | null => {
    const categories: ICategories[] = data.filter(item => item.sub_categories?.[0]);

    let subCategory;
    if (categories.length) {
        for (const cat of categories) {
            subCategory = cat.sub_categories?.find(item => item.slug === slug);
            if (subCategory) break;
        }
    }
    return subCategory || null;
};

type IFunction = (...args: unknown[]) => void;
export const throttle = (func: IFunction, time: number): IFunction => {
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

// decode data from cookie
export const decode = (cookie = ''): string => decodeURI(cookie).replace(/\\"/gi, '');

// parse cookie on server
export const parseCookie = <T>(cookie = '', key = 'phoqer_auth'): T | null => {
    try {
        const obj = decode(cookie)
            ?.split(' ')
            ?.find(i => i.includes(key))
            ?.replace(/\+/g, ' ')
            ?.replace(/%2C/gi, ',')
            ?.split(key + '=')[1];

        return obj ? JSON.parse(obj) : null;
    } catch (error) {
        return null;
    }
};

// custom console log for site identity
export const logger = (): void => {
    if (process.env.NODE_ENV === 'production') console.clear();
    console.log(
        '%c Phoqer %c v0.0.1 Made with love ...',
        'padding: 6px 15px; border-radius: 10px; background: #eee; text-transform: uppercase; color: #2771A3; font-size: 1rem; font-weight: 600; font-family: Montserrat, sans-serif',
        'color: #DB162F; font-size: 0.8rem;',
    );
};

export const moneyFormat = (value = 0): string => {
    if (!value) return '';
    return String(value)
        .split('')
        .reverse()
        .map((item, index): string => (index % 3 ? item : item + ' '))
        .reverse()
        .join('')
        .trim();
};

// 1 день 2 дня 5 дней ...
export const declOfNum = (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};
