// format category list from backend in relation to IDropList interface
import { ICategories, IDropList, IDropValue } from '../../interfaces';

export const formatCatList = (data: ICategories[]): IDropList[] =>
    data?.map<IDropList>(
        (item: ICategories): IDropList =>
            item?.sub_category?.length
                ? { icon_image: item.icon_image, image: item.image, slug: item.slug, sub: item.sub_category }
                : item,
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

// find sub category by slug
export const findParentCategory = (data: IDropList[], slug: string): IDropList | null => {
    const categories: IDropList[] = data.filter(item => item?.sub?.[0]);
    let parentCategory;
    if (categories.length) {
        for (const cat of categories) {
            if (cat.sub?.find(item => item.slug === slug)) {
                parentCategory = cat;
                break;
            }
        }
    }
    return parentCategory || null;
};
