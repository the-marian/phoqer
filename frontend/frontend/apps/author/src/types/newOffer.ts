import { ID } from 'query';

export interface OfferTitle {
    title: string;
}

export interface OfferDescription {
    description: string;
}

export interface OfferParameters {
    category: ID | null;
    price: number | string;
}

export interface OfferImages {
    images: string[];
}

export interface NewOfferData extends OfferTitle, OfferDescription, OfferParameters, OfferImages {
    id?: ID;
}

export enum Steps {
    Title,
    Description,
    Parameters,
    Images,
    Done,
}
