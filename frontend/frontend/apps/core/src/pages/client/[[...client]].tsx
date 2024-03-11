import { FC } from 'react';

import { MainLayout, AppsLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';

const Client: FC = () => {
    return (
        <AppsLayout>
            <MainLayout>
                <Meta title="Phoqer | Client dashboard" />
            </MainLayout>
        </AppsLayout>
    );
};

export default Client;
