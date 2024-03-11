import React from 'react';

import classNames from 'classnames';
import { Avatar, Skeleton } from 'phoqer';

import css from './chat-item.module.scss';

interface Props {
    count?: number;
}
export const ChatItemLoader = ({ count = 8 }: Props): JSX.Element => {
    return (
        <>
            {[...Array(count)].map((_, index) => (
                <div className={css.loading} key={index}>
                    <Avatar className={css.avatar} />

                    <div className={css.content}>
                        <div className={css.head}>
                            <Skeleton className={css.name} color="dark" style={{ width: '12rem' }} />

                            <Skeleton className={css.small} style={{ width: '5rem' }} />
                        </div>

                        <Skeleton className={classNames(css.text, css.mt)} />
                        <Skeleton className={classNames(css.text, css.w75)} />
                    </div>
                </div>
            ))}
        </>
    );
};
