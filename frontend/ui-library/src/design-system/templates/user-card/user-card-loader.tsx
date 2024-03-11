import { FC } from 'react';

import { Skeleton } from 'src/design-system/feedback';

import css from './user-card.module.scss';

export const UserCardLoader: FC = () => {
    return (
        <div className={css.root}>
            <Skeleton style={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%' }} />
            <div className={css.userData}>
                <Skeleton color="blue" style={{ width: '10rem', height: '0.8rem', marginBottom: '1rem' }} />
                <Skeleton color="light" style={{ width: '15rem', height: '0.8rem' }} />
            </div>
        </div>
    );
};
