import { FC, ReactNode } from 'react';

import classNames from 'classnames';

import { Comments } from './assets/comments';
import { Form } from './assets/form';
import { NotFound } from './assets/not-found';
import { Search } from './assets/search';
import css from './empty-state.module.scss';

export interface IconProps {
    type?: '404' | 'form' | 'comments' | 'search';
}
export const EmptyStateIcon: FC<IconProps> = ({ type }) => {
    switch (type) {
        case '404':
            return <NotFound className={css.icon} />;

        case 'form':
            return <Form className={css.icon} />;

        case 'comments':
            return <Comments className={css.icon} />;

        case 'search':
            return <Search className={css.icon} />;

        default:
            return <NotFound className={css.icon} />;
    }
};

export interface EmptyStateProps extends IconProps {
    children: ReactNode;
    className?: string;
}
export const EmptyState: FC<EmptyStateProps> = ({ children, className, type }) => {
    return (
        <div className={classNames(css.root, className)}>
            <EmptyStateIcon type={type} />
            <div className={css.children}>{children}</div>
        </div>
    );
};
