import { useMemo } from 'react';

import { NextPage } from 'next';

import { Breadcrumbs } from '@app/components/common/breadcrumbs/breadcrumbs';
import { Layout } from '@app/components/layout/layout';
import { Meta } from '@app/components/meta/meta';
import { CategoryHead } from '@app/components/pages/search/category-head/category-head';
import { SearchLayout } from '@app/components/pages/search/search-layout';
import { SearchOffers } from '@app/components/pages/search/search-offers';
import { RecentOffers } from '@app/components/recent-offers/recent-offers';
import { SearchProvider } from '@app/context/search.context';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

const Category: NextPage = () => {
    const { t } = useTranslation();
    const breadcrumbs = useMemo(
        () => [{ url: routes.categories.list, title: t('Categories') }, { title: t('Search offers') }],
        [t],
    );

    return (
        <Layout withFooter>
            <Meta title={t('Phoqer | Offers')} />

            <SearchProvider>
                <Breadcrumbs value={breadcrumbs} />
                <CategoryHead />

                <SearchLayout>
                    <SearchOffers />
                    <RecentOffers />
                </SearchLayout>
            </SearchProvider>
        </Layout>
    );
};

export default Category;
