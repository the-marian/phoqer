import { FC } from 'react';

import { Appear } from 'phoqer-shared';

import { FavoriteHeader } from '@app/components/pages/favorite/mobile/favorite-header/favorite-header';
import { FavoriteList } from '@app/components/pages/favorite/mobile/favorite-list/favorite-list';
import css from '@app/components/pages/favorite/shared/styles.module.scss';

const Mobile: FC = () => {
    return (
        <Appear timeout={100} className={css.root}>
            <FavoriteHeader />
            <FavoriteList />
        </Appear>
    );
};

export default Mobile;
