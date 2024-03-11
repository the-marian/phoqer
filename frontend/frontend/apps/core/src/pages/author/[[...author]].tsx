import { FC } from 'react';

import { PrivatePage, AppsLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';
import dynamic from 'next/dynamic';

const AuthorApp = dynamic(() => import('phoqer-author').then(module => module.AuthorApp), { ssr: false });

const Author: FC = () => {
    return (
        <PrivatePage>
            <AppsLayout>
                <Meta title="Phoqer | Author dashboard" />
                <AuthorApp />
            </AppsLayout>
        </PrivatePage>
    );
};

export default Author;
