import { omit } from 'lodash-es';
import { Offer } from 'phoqer';

import { defaultValue } from 'src/pages/edit-offer/edit-offer.config';
import { EditOfferForm } from 'src/pages/edit-offer/edit-offer.types';
import { ImageOrder } from 'src/pages/new-offer/new-offer.types';

export const imagesToOrderType = (images: string[]): ImageOrder[] => {
    return images.map(url => {
        const urlSplit = url.split('/');
        return { url, id: url, name: urlSplit[urlSplit.length - 1].split('?')[0] };
    });
};

export const getDefaultFormValue = (offer?: Offer): EditOfferForm => {
    if (!offer) return defaultValue;

    return {
        ...omit(offer, 'author', 'id', 'reviews'),
        saleFlag: Boolean(offer.sale),
        images: imagesToOrderType(offer.images),
    };
};

export const normalizeFormData = (formData: EditOfferForm): Partial<Offer> => {
    return {
        ...omit(formData, 'saleFlag', 'sale'),
        price: Number(formData.price as string),
        images: formData.images.map(image => image.url),
        sale:
            formData.sale && formData.saleFlag
                ? {
                      percentage: Number(formData.sale.percentage ?? 0),
                      description: formData.sale.description ?? '',
                  }
                : null,
    } as Partial<Offer>;
};
