import { AnyAction, Store } from 'redux';

/**
 * Document structure
 * 1 GENERAL
 * 2 AUTH
 * 3 CATEGORIES
 * 4 OFFERS
 * 5 REDUX STORE
 * */

// =====================================
// GENERAL
// =====================================
export interface IDropList {
    name: string;
    slug: string;
    sub?: { name: string; slug: string }[];
}

// =====================================
// AUTH
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
// CATEGORIES
// =====================================
export interface ICategories {
    name: string;
    image: string;
    slug: string;
    sub_categories?: { name: string; slug: string }[];
}

// =====================================
// OFFERS
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
// REDUX STORE
// =====================================
export interface IState {
    auth: IAuth;
    filters: { open: boolean };
    categories: ICategories[] | null;
    offers: IOffers;
}

export interface IStore extends Store<IState, AnyAction> {
    sagaTask?: { toPromise: () => void };
}
