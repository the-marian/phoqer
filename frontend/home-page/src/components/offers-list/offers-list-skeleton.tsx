import { FC } from 'react';

import { range } from 'lodash-es';
import { Option, Skeleton, Flex } from 'phoqer';

import { UiPagination } from '@app/config/ui.config';

import css from './offers-list.module.scss';

export const OffersListSkeleton: FC = () => {
    return (
        <>
            {range(0, UiPagination.MD).map((_, index) => (
                <Option className={css.loading} key={index} tabIndex={-1}>
                    <Flex align="center" justify="space-between">
                        <div className={css.imageContainer}>
                            <Skeleton color="blue" style={{ height: '100%' }} />
                        </div>

                        <div className={css.content}>
                            <Skeleton style={{ marginBottom: '1rem', width: '50%', height: '0.7rem' }} />
                            <Skeleton style={{ marginBottom: '0.8rem', height: '0.7rem', width: '60%' }} />
                            <Skeleton style={{ width: '40%', height: '0.7rem' }} />
                        </div>
                    </Flex>
                </Option>
            ))}
        </>
    );
};
