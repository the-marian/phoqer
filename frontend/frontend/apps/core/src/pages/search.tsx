import { FC } from 'react';

import { MainLayout } from '@app/components/Layout';
import { Meta } from '@app/components/Meta';
import dynamic from 'next/dynamic';

const SearchApp = dynamic(() => import('phoqer-search').then(module => module.SearchApp), { ssr: false });

const Search: FC = () => {
    return (
        <MainLayout spacing={10}>
            <Meta title="Phoqer - SearchPage" />
            <SearchApp />
        </MainLayout>
    );
};

export default Search;
