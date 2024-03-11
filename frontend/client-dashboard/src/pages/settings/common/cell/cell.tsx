import React, { ReactNode } from 'react';

import classNames from 'classnames';

import css from './cell.module.scss';

interface Props {
    title: string;
    className?: string;
    children: ReactNode;
}
export const Cell = ({ title, children, className }: Props): JSX.Element => {
    return (
        <div className={classNames(css.section, className)}>
            <h2 className={css.title}>{title}</h2>
            <div className={css.inner}>{children}</div>
        </div>
    );
};
