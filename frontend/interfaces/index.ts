import { Store } from 'redux';

/**
 * Document structure
 * 1 GENERAL
 * 2 AUTH
 * 3 CATEGORIES
 * 4 OFFERS
 * 5 COMMENTS
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
    id: number;
    auth_token: string | null;
    birth_date: string | null;
    email: string;
    location: string | null;
    last_name: string;
    first_name: string;
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
    images?: { id?: number; url: string }[];
    is_favorite: boolean;
    is_promoted: boolean;
    is_deliverable: boolean;
    doc_needed: boolean;
    price: number;
    title: string;
    views: number;
    description: string;
    extra_requirements?: string;
}

export interface IOfferPopular {
    data: IOfferCard[] | null;
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
    popular: IOfferPopular;
    single: IOfferCard;
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
export interface IProfile {
    id?: number;
    auth_token: string | null;
    birth_date?: string | null;
    email?: string;
    location?: string | null;
    last_name?: string;
    first_name?: string;
}

// =====================================
// REDUX STORE
// =====================================
export interface IState {
    auth: IAuth;
    filters: { open: boolean };
    categories: ICategories[] | null;
    offers: IOffers;
    comments: { loading: boolean; data: IComment[] | null };
    profile: IProfile | null;
}

export interface IStore extends Store<IState> {
    sagaTask?: { toPromise: () => void };
}
