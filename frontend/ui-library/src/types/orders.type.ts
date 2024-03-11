import type { ID } from './common.type';
import type { OfferItemType } from './offers.type';
import type { Pagination } from './pagination.type';
import type { User } from './user.type';

export enum OrderStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    IN_PROGRESS = 'in_progress',
    REJECTED = 'rejected',
    DONE = 'done',
}

type Offer = Pick<OfferItemType, 'id' | 'title' | 'price' | 'description' | 'images' | 'sale' | 'category'>;
export interface Order extends Offer {
    status: string;
    offerId: ID;
    country: string;
    city: string;
    zip: string;
    address: string;
    comment?: string | null;
    date: string;
    startDate?: string | number;
    expired?: string;
    user: User;
}

export type OrdersList = Pagination<Order[]>;
