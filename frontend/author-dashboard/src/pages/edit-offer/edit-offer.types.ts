import { ICategory, SaleType } from 'phoqer';

import { ImageOrder } from 'src/pages/new-offer/new-offer.types';

export interface EditOfferForm {
    title: string;
    description: string;
    images: ImageOrder[];
    price: number | string;
    sale?: SaleType | null;
    saleFlag: boolean;
    category?: Pick<ICategory, 'title' | 'slug'> | null;
}
