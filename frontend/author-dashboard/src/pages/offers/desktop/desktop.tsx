import React, { useEffect, useRef } from 'react';

import { Appear, useOffersContext } from 'phoqer-shared';

import { TableBody } from 'src/pages/offers/desktop/table-body/table-body';
import { TableHeader } from 'src/pages/offers/desktop/table-header/table-header';

import css from './desktop.module.scss';

const Desktop = (): JSX.Element => {
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
            <TableHeader />
            <TableBody />
        </Appear>
    );
};

export default Desktop;
