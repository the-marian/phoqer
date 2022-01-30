import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IPagination<T> {
    total: number;
    data: T[];
}

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

export interface ISearch {
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
    sub?: ITabs[];
}

export interface ITabsNum {
    messages?: number | string;
    notifications?: number | string;
}

export type Themes = 'white' | 'black';

export interface IConfig {
    warning: boolean;
    hideSearchFilters: boolean;
    hideTopSearchQuery: boolean;
    hideTopOffers: boolean;
}

export interface Params {
    [key: string]: unknown;
}

export type AdType = 'horizontal' | 'square';
