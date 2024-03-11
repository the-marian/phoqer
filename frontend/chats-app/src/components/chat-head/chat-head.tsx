import React, { ReactNode } from 'react';

import classNames from 'classnames';

import css from './chat-head.module.scss';

interface Props {
    className?: string;
    children?: ReactNode;
}
export const ChatHead = ({ children, className }: Props): JSX.Element => {
    return <div className={classNames(css.head, className)}>{children}</div>;
};
