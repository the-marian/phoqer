import React from 'react';

import { OrderLoader } from 'phoqer';

import { UiPagination } from 'src/config/ui.config';

export const CardsLoader = (): JSX.Element => {
    return (
        <>
            {[...Array(UiPagination.SX)].map((_, index) => (
                <OrderLoader key={index} />
            ))}
        </>
    );
};
