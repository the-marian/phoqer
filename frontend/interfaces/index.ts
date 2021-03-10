import { AnyAction, Store } from 'redux';

/**
 * Document structure
 * 1 GENERAL
 * 2 AUTH
 * 3 CATEGORIES
 * 4 OFFERS
 * 5 COMMENTS
 * 6 PUBLIC_PROFILE
 * REDUX STORE
 * */

// =====================================
// 1 GENERAL
// =====================================
export interface IDropList {
    name: string;
    slug: string;
    sub?: { name: string; slug: string }[];
}

export type Themes = 'white' | 'black';

export interface IDropValue {
    name: string;
    slug: string;
    type: 'main' | 'sub';
}

// =====================================
// 2 AUTH
// =====================================
export interface ILogin {
    username: string;
    password: string;
}

export interface ISignup {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface IAuth extends IPublicProfile {
    access_token: string | null;
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
    category?: string | null;
    sub_category?: string | null;
    deposit_val?: number | null;
    min_rent_period?: number | null;
    max_rent_period?: number | null;
    pub_date?: string;
    cover_image: string;
    images?: string[];
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
    currency: string;
    author_id: number;
    category_name?: null | string;
    sub_category_name?: null | string;
    status: string;
}

export interface IOfferPagination {
    data: IOfferCard[];
    total: number;
}

export interface IOfferDynamic {
    data: IOfferPagination;
    loading: boolean;
}

export interface IOfferStatic {
    data: IOfferCard[];
    loading: boolean;
}

export interface INewOffer {
    id?: string | null;
    // step one
    title: string;
    price: number | null;
    category: IDropValue | null;
    is_deliverable: boolean;
    // step two
    doc_needed: boolean;
    description: string;
    deposit_val: number | null;
    min_rent_period: number | null;
    max_rent_period: number | null;
    extra_requirements: string;
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
    favorite: IOfferStatic;
    single: IOfferCard | null;
    newOffer: INewOffer;
}

// =====================================
// 5 COMMENTS
// =====================================
export interface IComment {
    id: number;
    body: string;
    offer_id: string;
    replies_id: number | null;
    images: string[];
    author_id: number;
    dislikes: number;
    dislike: boolean;
    last_name: string;
    first_name: string;
    profile_img: string | null;
    likes: number;
    like: boolean;
    pub_date: string;
    replies: IComment[];
}
// =====================================
// 6 PUBLIC_PROFILE
// =====================================
export interface IPublicProfile {
    id?: number;
    birth_date?: string | null;
    email?: string;
    location?: string | null;
    last_name?: string;
    first_name?: string;
    profile_img?: string | null;
}

// =====================================
// REDUX STORE
// =====================================
export interface IState {
    auth: IAuth;
    drawer: boolean;
    filters: boolean;
    categories: ICategories[];
    offers: IOffers;
    comments: { loading: boolean; data: IComment[] };
    profiles: {
        public: IPublicProfile | null;
        private: null;
    };
}

export interface IStore extends Store<IState, AnyAction> {
    sagaTask?: { toPromise: () => void };
}
