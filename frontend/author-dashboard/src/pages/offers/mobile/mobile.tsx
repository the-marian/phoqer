import React, { useEffect, useRef } from 'react';

import { Appear, useOffersContext } from 'phoqer-shared';

import { OffersHeader } from 'src/pages/offers/mobile/offers-header/offers-header';
import { OffersList } from 'src/pages/offers/mobile/offers-list/offers-list';

import css from './mobile.module.scss';

const Mobile = (): JSX.Element => {
    const initRef = useRef<boolean>(true);
    const { initTable } = useOffersContext();

    useEffect(() => {
        if (initRef.current) {
            initTable();
            initRef.current = false;
        }
    }, [initTable]);

    return (
        <Appear className={css.appear}>
            <OffersHeader />
            <OffersList />
        </Appear>
    );
};

export default Mobile;
