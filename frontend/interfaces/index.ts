import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Params } from 'next/dist/next-server/server/router';
import { AnyAction, Store } from 'redux';

/**
 * Document structure
 * 1_GENERAL
 * 2_AUTH
 * 3_CATEGORIES
 * 4_OFFERS
 * 5_COMMENTS
 * 6_PUBLIC_PROFILE
 * 7_CHAT
 * 8_REGION
 * REDUX STORE
 * */

// =====================================
// 1_GENERAL
// =====================================
export interface IDropList {
    icon_image?: string;
    image?: string;
    name?: string;
    slug: string;
    sub?: IDropList[];
}

export interface IDropValue {
    name: string;
    slug: string;
    type: 'main' | 'sub';
}

export interface ICheckboxes {
    [key: string]: boolean | null;
}

export interface ISearch extends Params {
    search: string | null;
    category: string | null;
    sub_category: string | null;
    period: string | null;
    status: string | null;
    ordering: string | null;
    max_price: number | null;
    min_price: number | null;
    top: boolean | null;
    no_deposit: boolean | null;
    is_deliverable: boolean | null;
}

export interface ITabs {
    id: number | string;
    text: string;
    link?: string;
    icon?: IconProp;
    count?: number | string;
    blank?: boolean;
    onClick?: () => void;
}

export interface ITabsNum {
    messages?: number | string;
    reviews?: number | string;
}

export type Themes = 'blue' | 'green' | 'aqua' | 'violet' | 'black-aqua' | 'black-blue' | 'black-violet' | 'black-orange';

export interface IConfig {
    warning: boolean;
    hideSearchFilters: boolean;
    hideTopSearchQuery: boolean;
    hideTopOffers: boolean;
}

// =====================================
// 2_AUTH
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

export interface IAuth {
    loading: boolean;
    access_token: string | null;
}

// =====================================
// 3_CATEGORIES
// =====================================
export interface ICategories {
    icon_image: string;
    image: string;
    slug: string;
    sub_category?: ICategories[];
}

// =====================================
// 4_OFFERS
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
    currency: string;
    author_id: number;
    status: string;
}

export interface IOfferPagination {
    data: IOfferCard[];
    total: number;
}

export interface IOfferDynamic {
    data: IOfferPagination;
    loading: boolean;
    pagination: boolean;
}

export interface IOfferStatic {
    data: IOfferCard[];
    loading: boolean;
}

export interface INewOffer {
    loading: boolean;
    id?: string | null;
    // step one
    title: string;
    price: number | null;
    category?: IDropValue | null;
    sub_category?: IDropValue | null;
    is_deliverable: boolean;
    currency: 'EUR' | 'PLN' | 'UAH' | 'USD' | null;
    // step two
    doc_needed: boolean;
    description: string;
    deposit_val: number | null;
    min_rent_period: number | null;
    max_rent_period: number | null;
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
    single: IOfferCard | null;
    new_offer: INewOffer;
    edit_offer: {
        loading: boolean;
    };
}

// =====================================
// 5_COMMENTS
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
// 6_PUBLIC_PROFILE
// =====================================
export interface IPublicProfile {
    bio?: string;
    birth_date?: string | null;
    communication_rate?: number;
    date_joined?: string;
    description_rate?: string;
    dislikes?: number;
    email?: string | null;
    id?: string | number;
    first_name?: string;
    last_login?: string;
    last_activity?: string;
    last_name?: string;
    likes?: number;
    location?: string;
    profile_img?: string | null;
    response_rate?: number;
    satisfaction_rate?: number;
}

// =====================================
// 7_CHAT
// =====================================
export interface IChat {
    id: string | number;
    newMessages: number;
    cover_image: null | string;
    first_name: string;
    last_name: string;
    date: string;
    preview: string;
}

// =====================================
// 8_REGION
// =====================================
export interface ICountry {
    slug: string;
}

export interface ICity {
    slug: string;
    countries_slug: string;
}

export interface IRegion {
    loading: boolean;
    countries?: ICountry[];
    cities?: ICity[];
    selected?: {
        country: string;
        city: string;
    };
}

// =====================================
// REDUX STORE
// =====================================
export interface IState {
    auth: IAuth;
    user: IPublicProfile;
    region: IRegion;
    config: {
        drawer: boolean;
        searchParams: ISearch;
    };
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
