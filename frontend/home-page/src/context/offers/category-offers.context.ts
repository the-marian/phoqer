import { createContext, useContext } from 'react';

import { OfferListType } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

export const CategoryOffersContext = createContext<OfferListType>(getEmptyPagination());

export const useCategoryOffersContext = (): OfferListType => {
    return useContext(CategoryOffersContext);
};
