import { FC } from 'react';

import { MainLayout, PrivatePage } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';

const Favorite: FC = () => {
    return (
        <PrivatePage>
            <MainLayout>
                <Meta title="Phoqer | Favorite offers" />
            </MainLayout>
        </PrivatePage>
    );
};

export default Favorite;
