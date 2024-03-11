import React, { useEffect, useRef } from 'react';

import { Appear, useOrdersContext } from 'phoqer-shared';

import { TableBody } from 'src/pages/orders/desktop/table-body/table-body';
import { TableHeader } from 'src/pages/orders/desktop/table-header/table-header';

import css from './desktop.module.scss';

const Desktop = (): JSX.Element => {
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
            <TableHeader />
            <TableBody />
        </Appear>
    );
};

export default Desktop;
