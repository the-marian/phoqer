import { FC } from 'react';

import { UserCardLoader, Skeleton, Flex } from 'phoqer';

import css from './offer-photos.module.scss';

export const OfferPhotosLoader: FC = () => {
    return (
        <ul>
            <li className={css.item}>
                <UserCardLoader />

                <Flex className={css.images}>
                    <Skeleton className={css.button} />
                    <Skeleton className={css.button} />
                </Flex>
            </li>

            <li className={css.item}>
                <UserCardLoader />

                <Flex className={css.images}>
                    <Skeleton className={css.button} />
                    <Skeleton className={css.button} />
                    <Skeleton className={css.button} />
                </Flex>
            </li>
        </ul>
    );
};
