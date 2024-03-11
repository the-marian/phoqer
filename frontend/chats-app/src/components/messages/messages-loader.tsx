import React from 'react';

import { UserCardLoader, Button, EllipsisVerticalIcon, Skeleton } from 'phoqer';

import css from './messages.module.scss';

export const MessagesLoader = (): JSX.Element => {
    return (
        <div className={css.inner}>
            <div className={css.scroll}>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className={css.loader}>
                        <div className={css.head}>
                            <UserCardLoader />

                            <Button onlyIcon className={css.options}>
                                <EllipsisVerticalIcon />
                            </Button>
                        </div>

                        <div className={css.content}>
                            <Skeleton className={css.text} />
                            <Skeleton className={css.text} />
                            <Skeleton className={css.text} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
