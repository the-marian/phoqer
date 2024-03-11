import { FC } from 'react';

import { Skeleton } from 'src/design-system/feedback';
import { Flex } from 'src/design-system/layout';

import css from './small-offer.module.scss';

export const SmallOfferCardLoader: FC = () => {
    return (
        <Flex className={css.root} justify="space-between" align="center">
            <Skeleton className={css.image} />

            <Flex direction="column" style={{ width: 'calc(100% - 12rem)' }}>
                <Skeleton style={{ height: '1.4rem', width: '90%' }} />
                <Skeleton style={{ marginTop: '1rem', width: '40%', height: '1rem' }} />
            </Flex>

            <Skeleton style={{ width: '4rem', height: '2.2rem', borderRadius: '2rem' }} color="blue" />
        </Flex>
    );
};
