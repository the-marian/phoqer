import React from 'react';

import classNames from 'classnames';
import { Container } from 'phoqer';

import { Pagination } from 'src/pages/offers/shared/pagination/pagination';
import { StatusTabs } from 'src/pages/offers/shared/status-tabs/status-tabs';

import css from './offers-header.module.scss';

export const OffersHeader = (): JSX.Element => {
    return (
        <>
            <div className={classNames(css.my, css.status)}>
                <StatusTabs />
            </div>

            <Container className={css.my}>
                <Pagination />
            </Container>
        </>
    );
};
