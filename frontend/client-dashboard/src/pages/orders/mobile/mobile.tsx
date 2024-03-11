import React, { useEffect, useRef } from 'react';

import { Appear, useOrdersContext } from 'phoqer-shared';

import { OffersHeader } from 'src/pages/orders/mobile/offers-header/offers-header';
import { OrdersList } from 'src/pages/orders/mobile/orders-list/orders-list';

import css from './mobile.module.scss';

const Mobile = (): JSX.Element => {
    const initRef = useRef<boolean>(true);
    const { initTable } = useOrdersContext();

    useEffect(() => {
        if (initRef.current) {
            initTable();
            initRef.current = false;
        }
    }, [initTable]);

    return (
        <Appear className={css.appear}>
            <OffersHeader />
            <OrdersList />
        </Appear>
    );
};

export default Mobile;
