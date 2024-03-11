import { FC } from 'react';

import dynamic from 'next/dynamic';
import { useMedia, ReduceAnimationsProvider } from 'phoqer';

import { SubHeader } from '@app/components/pages/favorite/shared/sub-header/sub-header';
import { FavoriteContextProvider } from '@app/context/favorite.context';

const Desktop = dynamic(() => import('./desktop/desktop'));
const Mobile = dynamic(() => import('./mobile/mobile'));

const Favorite: FC = () => {
    const isMobile = useMedia(1200);
    return (
        <ReduceAnimationsProvider>
            <FavoriteContextProvider>
                <SubHeader />
                {isMobile ? <Mobile /> : <Desktop />}
            </FavoriteContextProvider>
        </ReduceAnimationsProvider>
    );
};

export default Favorite;
