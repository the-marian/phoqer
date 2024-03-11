import { FC } from 'react';

import classNames from 'classnames';
import { Skeleton } from 'src/design-system/feedback';
import { EllipsisHorizontalIcon } from 'src/design-system/icons';
import { IconButton } from 'src/design-system/inputs';
import { Flex } from 'src/design-system/layout';

import css from './order.module.scss';

export const OrderLoader: FC = () => {
    return (
        <div className={css.root}>
            <Flex className={css.wrapper} align="flex-start" justify="space-between">
                <div className={css.width}>
                    <Skeleton className={classNames(css.button, css.light)} />
                </div>

                <IconButton label="Options" className={css.options}>
                    <EllipsisHorizontalIcon />
                </IconButton>
            </Flex>

            <div className={css.offer}>
                <Skeleton className={css.img} style={{ margin: 0 }} />

                <div className={css.container}>
                    <Skeleton className={css.title} style={{ height: '2rem', width: '70%', marginTop: '0.4rem' }} />
                    <Skeleton className={css.category} style={{ height: '2rem', width: '40%', marginTop: '0.7rem 0' }} />
                </div>
            </div>
        </div>
    );
};
