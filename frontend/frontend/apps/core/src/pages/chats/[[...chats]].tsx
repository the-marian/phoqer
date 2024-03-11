import { FC } from 'react';

import { PrivatePage, AppsLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';

const Chats: FC = () => {
    return (
        <PrivatePage>
            <AppsLayout>
                <Meta title="Phoqer | Messages" />
            </AppsLayout>
        </PrivatePage>
    );
};

export default Chats;
