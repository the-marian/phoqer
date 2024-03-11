import { createContext, useContext } from 'react';

import { OfferItemType } from 'phoqer';

type SingleOfferContext = {
    offer: OfferItemType;
};
export const SingleOfferContext = createContext<SingleOfferContext>({ offer: {} } as SingleOfferContext);

export const useSingleOfferContext = (): SingleOfferContext => {
    return useContext(SingleOfferContext);
};
