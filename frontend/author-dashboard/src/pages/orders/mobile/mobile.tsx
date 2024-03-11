import React, { useEffect, useRef } from 'react';

import { Appear, useOrdersContext } from 'phoqer-shared';

import { OrdersHeader } from 'src/pages/orders/mobile/orders-header/orders-header';
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
            <OrdersHeader />
            <OrdersList />
        </Appear>
    );
};

export default Mobile;
