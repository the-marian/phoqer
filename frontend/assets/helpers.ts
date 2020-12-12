import { ICategories, IDropList } from '../interfaces';

export const addZeroToNumber = (value: string | number): string => String(value).padStart(2, '0');

export const numberValidation = (text: string): boolean => {
    if (text === '') return true;
    const regExp = /^\d{1,8}$/;
    return regExp.test(text);
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

export const logger = () => {
    console.clear();
    console.log(
        '%c Phoqer',
        'padding: 6px 15px; border-radius: 10px; background: #eee; text-transform: uppercase; color: #2771A3;' +
            'font-size: 2rem; font-weight: 600; font-family: Montserrat, sans-serif',
    );

    console.log('%c   ', 'font-size:250px; background:url("http://140.82.39.245/mediafiles/console%20(1).jpg") no-repeat;');
};
