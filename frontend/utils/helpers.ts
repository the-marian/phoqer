import { ICategories, IDropList } from '../interfaces';

export const addZeroToNumber = (value: string | number): string =>
  String(value).padStart(2, '0');

export const numberValidation = (text: string): boolean => {
  if (text === '') return true;
  const regExp = /^\d{1,8}$/;
  if (!regExp.test(text)) return false;
  return true;
};

export const formateCatList = (data: ICategories[]): IDropList[] =>
  data?.map(
    (item: ICategories): IDropList =>
      item.sub_categories
        ? { name: item.name, sub: item.sub_categories }
        : item,
  );
