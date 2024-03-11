import { FC } from 'react';

import classNames from 'classnames';
import { Skeleton } from 'src/design-system/feedback';

import { UserCardLoader } from '../user-card';

import css from './comment.module.scss';

export const CommentLoader: FC = () => (
    <div className={classNames(css.comment, 'comment')}>
        <div className={css.header}>
            <UserCardLoader />
        </div>

        <div className={css.content}>
            <Skeleton style={{ width: '100%', height: '0.6rem', marginBottom: '1rem' }} />
            <Skeleton style={{ width: '100%', height: '0.6rem', marginBottom: '1rem' }} />
            <Skeleton style={{ width: '60%', height: '0.6rem', marginBottom: '1rem' }} />
        </div>
    </div>
);
