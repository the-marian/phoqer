import { ICategories, IDropList } from '../interfaces';

export const addZeroToNumber = (value: string | number): string =>
  String(value).padStart(2, '0');

export const numberValidation = (text: string): boolean => {
  if (text === '') return true;
  const regExp = /^\d{1,8}$/;
  if (!regExp.test(text)) return false;
  return true;
};

// formate category list frome beckend
export const formateCatList = (data: ICategories[]): IDropList[] =>
  data?.map(
    (item: ICategories): IDropList =>
      item.sub_categories
        ? { name: item.name, slug: item.slug, sub: item.sub_categories }
        : item,
  );

// find categoty name
export const findCategory = (
  data: IDropList[],
  slug: string,
): string | null => {
  const category: IDropList | undefined = data.find(item => item.slug === slug);
  return category ? category.name : null;
};

// find sub categoty name
export const findSubCategory = (
  data: IDropList[],
  slug: string,
): string | null => {
  const category: IDropList | undefined = data
    .filter(item => item.sub)
    .find(item => item.slug === slug);
  return category ? category.name : null;
};
