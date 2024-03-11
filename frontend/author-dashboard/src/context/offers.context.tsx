import React, { ReactNode } from 'react';

import { OffersContextProvider } from 'phoqer-shared';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { offersService } from 'src/services/offers.service';

interface Props {
    children: ReactNode;
}
export const OffersContext = ({ children }: Props): JSX.Element => {
    const errorToast = useErrorToast();

    return (
        <OffersContextProvider http={offersService.getOffers} onError={errorToast}>
            {children}
        </OffersContextProvider>
    );
};
