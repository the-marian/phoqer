import React from 'react';

import { Background } from 'phoqer';

import css from './banner.module.scss';

export const Banner = (): JSX.Element => {
    return (
        <div className={css.root}>
            <Background />
        </div>
    );
};
