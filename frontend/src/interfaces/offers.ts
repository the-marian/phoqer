import { IDropValue, IPagination } from './general';

export interface IOfferCard {
    id: string;
    category?: string | null;
    sub_category?: string | null;
    deposit_val?: number | null;
    min_rent_period?: number | null;
    max_rent_period?: number | null;
    pub_date?: string;
    cover_image: string;
    images?: string[];
    rental_period?: IRentalPeriod;
    functions?: ('DO_INACTIVE' | 'ARCHIVE' | 'PROMOTE' | 'EDIT' | 'DELETE' | 'DO_REVIEW')[];
    is_favorite: boolean;
    is_promoted: boolean;
    is_deliverable: boolean;
    doc_needed: boolean;
    price: number;
    title: string;
    views: number;
    description: string;
    extra_requirements?: string;
    city: string;
    country: string | null;
    currency: string | null;
    author_id: number;
    user_id: number;
    status: string;
}

export type IOfferPagination = IPagination<IOfferCard>;

export interface IOfferDynamic {
    data: IOfferPagination;
    loading: boolean;
    pagination: boolean;
}

export interface IOfferStatic {
    data: IOfferCard[];
    loading: boolean;
}

export type IRentalPeriod = 'DAY' | 'HOUR' | 'MONTH';
export type ICurrency = 'EUR' | 'UAH' | 'USD' | null;

export interface INewOffer {
    loading: boolean;
    id?: string | null;
    // step one
    title: string;
    price: number | string | null;
    city?: string | null;
    country?: string | null;
    category?: IDropValue | null;
    sub_category?: IDropValue | null;
    items_amount?: number | string | null;
    rental_period: IDropValue | null;
    currency: IDropValue | null;
    // step two
    is_deliverable: boolean;
    doc_needed: boolean;
    description: string;
    deposit_val: number | string | null;
    min_rent_period: number | string | null;
    max_rent_period: number | string | null;
    extra_requirements: string;
    cover_image?: string;
    optional: {
        deposit_val: boolean;
        min_rent_period: boolean;
        max_rent_period: boolean;
    };
    // is done
    isDone: {
        one: boolean;
        two: boolean;
        three: boolean;
    };
}

export interface IOffers {
    popular: IOfferStatic;
    search: IOfferDynamic;
    my_offers: IOfferDynamic;
    favorite: IOfferStatic;
    single: { loading: boolean; data: IOfferCard | null };
    new_offer: INewOffer;
    edit_offer: {
        loading: boolean;
    };
}
