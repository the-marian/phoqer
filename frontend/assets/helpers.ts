import { ICategories, IDropList } from '../interfaces';

export const addZeroToNumber = (value: string | number): string => String(value).padStart(2, '0');

export const numberValidation = (text: string): boolean => {
    if (text === '') return false;
    return !/^\d{1,15}$/.test(text);
};

// format category list from backend
export const formatCatList = (data: ICategories[]): IDropList[] =>
    data?.map(
        (item: ICategories): IDropList =>
            item.sub_categories ? { name: item.name, slug: item.slug, sub: item.sub_categories } : item,
    );

// find category name
export const findCategory = (data: IDropList[], slug: string): string | null => {
    const category: IDropList | undefined = data.find(item => item.slug === slug);
    return category ? category.name : null;
};

// find sub category name
export const findSubCategory = (data: IDropList[], slug: string): string | null => {
    const category: IDropList | undefined = data.filter(item => item.sub).find(item => item.slug === slug);
    return category ? category.name : null;
};

type IFunction = (...args) => void;
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

// custom console log for site identity
export const logger = (): void => {
    console.clear();
    console.log(
        '%c Phoqer | %c Made with love ...',
        'padding: 6px 15px; border-radius: 10px; background: #eee; text-transform: uppercase; color: #2771A3; font-size: 1rem; font-weight: 600; font-family: Montserrat, sans-serif',
        'color: #DB162F; font-size: 0.8rem;',
    );
};
