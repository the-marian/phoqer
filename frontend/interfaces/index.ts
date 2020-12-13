import { AnyAction, Store } from 'redux';

/**
 * Document structure
 * 1 GENERAL
 * 2 AUTH
 * 3 CATEGORIES
 * 4 OFFERS
 * 5 NEW OFFER
 * 6 REDUX STORE
 * */

// =====================================
// 1 GENERAL
// =====================================
export interface IDropList {
    name: string;
    slug: string;
    sub?: { name: string; slug: string }[];
}

export interface IDropValue {
    name: string;
    slug: string;
    type: 'main' | 'sub';
}

// =====================================
// 2 AUTH
// =====================================
export interface Login {
    email: string;
    password: string;
}

export interface IAuth {
    auth_token: string | null;
    user: string | null;
}

// =====================================
// 3 CATEGORIES
// =====================================
export interface ICategories {
    name: string;
    image: string;
    slug: string;
    sub_categories?: { name: string; slug: string }[];
}

// =====================================
// 4 OFFERS
// =====================================
export interface IOfferCard {
    id: string;
    cover_image: string;
    currency: string;
    is_favorite: boolean;
    is_promoted: boolean;
    is_deliverable: boolean;
    price: number;
    pud_date: string;
    title: string;
    views: number;
    description: string;
}

export interface IOfferPopular {
    data: IOfferCard[] | null;
    loading: boolean;
}

export interface IOffers {
    popular: IOfferPopular;
}

// =====================================
// 5 NEW OFFER
// =====================================

export interface INewOffer {
    // step one
    title: string;
    price: number | null;
    category: IDropValue | null;
    currency: IDropValue | null;
    is_deliverable: boolean;
    // step two
    doc_needed: boolean;
    description: string;
    deposit_val: number | null;
    min_rent_value: number | null;
    max_rent_value: number | null;
    extra_requirements: string;
    optional: {
        deposit_val: boolean;
        min_rent_value: boolean;
        max_rent_value: boolean;
    };
    // is done
    isDone: {
        one: boolean;
        two: boolean;
        three: boolean;
    };
}

// =====================================
// REDUX STORE
// =====================================
export interface IState {
    auth: IAuth;
    filters: { open: boolean };
    categories: ICategories[] | null;
    offers: IOffers;
    newOffer: INewOffer;
}

export interface IStore extends Store<IState, AnyAction> {
    sagaTask?: { toPromise: () => void };
}
