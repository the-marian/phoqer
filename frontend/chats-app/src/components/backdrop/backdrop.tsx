import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import classNames from 'classnames';

import css from './backdrop.module.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    open: boolean;
}
export const Backdrop = ({ open, className, ...props }: Props): JSX.Element => {
    return <div className={classNames(css.backdrop, className, open && css.open)} {...props} />;
};
