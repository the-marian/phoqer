import type { ICategory } from './categories.type';
import { ID } from './common.type';
import type { Pagination } from './pagination.type';
import type { User } from './user.type';

export interface SaleType {
    percentage: number;
    description: string;
}

export interface OfferItemType {
    id: ID;
    title: string;
    description: string;
    images: string[];
    price: number;
    reviews: number;
    author: User;
    category: Pick<ICategory, 'title' | 'slug'>;
    sale?: SaleType;
}

export type OfferCardType = Pick<OfferItemType, 'id' | 'title' | 'price'> & {
    image: string;
    authorId: ID;
    category: string;
    sale?: number | null;
    startDate?: number | string;
};

export type OfferListType = Pagination<OfferCardType[]>;

export interface Offer extends Omit<OfferItemType, 'author'> {
    status: string;
}

export type OfferList = Pagination<Offer[]>;
