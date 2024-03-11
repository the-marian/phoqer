import { createContext, useContext } from 'react';

import { OfferListType } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

export const AuthorOffersContext = createContext<OfferListType>(getEmptyPagination());

export const useAuthorOffersContext = (): OfferListType => {
    return useContext(AuthorOffersContext);
};
