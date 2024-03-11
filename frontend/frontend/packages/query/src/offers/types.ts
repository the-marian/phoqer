import { Category } from '../category';
import { ID, Pagination } from '../types';
import { User } from '../users';

export interface SaleType {
    percentage: number;
    description: string;
}

export interface OfferItem {
    id: ID;
    title: string;
    description: string;
    images: string[];
    price: number;
    reviews: number;
    author: User;
    category: Pick<Category, 'title' | 'slug'>;
    sale?: SaleType;
}

export type OfferCard = Pick<OfferItem, 'id' | 'title' | 'price'> & {
    image: string;
    authorId: ID;
    category: string;
    sale?: number | null;
    startDate?: number | string;
};

export type OfferList = Pagination<OfferCard[]>;

export type CreateOfferBody = Omit<OfferItem, 'sale' | 'category' | 'author' | 'id'> & { category: string };
export type UpdateOfferBody = Partial<CreateOfferBody> & { id: ID };
