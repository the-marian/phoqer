import { ID } from 'phoqer';

import { ParsedUrlQuery } from 'querystring';

export type FiltersType = Partial<{
    query: string;
    category: string;
    author: ID;
    minPrice: number;
    maxPrice: number;
    isTop: boolean;
    isSale: boolean;
    isReviews: boolean;
}>;

export const getFiltersFromParams = (query: ParsedUrlQuery): FiltersType => {
    return Object.entries(query).reduce<FiltersType>((acc, [key, value]) => {
        let newValue;
        try {
            newValue = JSON.parse(value as string);
        } catch {
            newValue = value;
        }

        acc[key as keyof FiltersType] = newValue;
        return acc;
    }, {});
};
