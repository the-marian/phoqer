import { ID } from './common.type';
import type { Pagination } from './pagination.type';
import type { User } from './user.type';

export interface ReviewItemType {
    id: ID;
    offerId: ID;
    description: string;
    score?: number | null;
    parent?: string | null;
    date: number | string;
    images: string[];
    author: User;
    replies?: number | null;
}

export type ReviewListType = Pagination<ReviewItemType[]>;
