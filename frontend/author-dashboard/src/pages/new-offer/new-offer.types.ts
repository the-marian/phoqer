import { ICategory, ID } from 'phoqer';

export interface OfferTitle {
    title: string;
}

export interface OfferDescription {
    description: string;
}

export interface OfferParameters {
    category?: ICategory | null;
    price: number | string;
}

export interface OfferImages {
    images: string[];
}

export interface ImageOrder {
    id: string;
    url: string;
    name: string;
}

export type NewOfferData = OfferTitle & OfferDescription & OfferParameters & OfferImages & { id?: ID };

export enum Steps {
    Title,
    Description,
    Parameters,
    Images,
    SortOffer,
    Preview,
    Done,
}
