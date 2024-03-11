import { FC } from 'react';

import classNames from 'classnames';
import { Skeleton } from 'src/design-system/feedback';

import css from './offer-card.module.scss';

export const OfferCardLoader: FC = () => {
    return (
        <div className={classNames(css.root, css.hover)}>
            <Skeleton className={css.img} />

            <div className={css.container}>
                <Skeleton className={css.title} style={{ height: '1.8rem', margin: '0.6rem 0' }} />
                <Skeleton className={css.category} style={{ height: '1.4rem', width: '50%', margin: '1rem 0' }} />
                <Skeleton className={css.price} style={{ height: '2.5rem', width: '8rem' }} />
            </div>
        </div>
    );
};
