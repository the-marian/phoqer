import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PrivatePage } from 'phoqer-shared';

import { Layout } from '@app/components/layout/layout';
import { useTranslation } from '@app/hook/translations.hook';

const Favorite = dynamic(() => import('../components/pages/favorite/favorite'), {
    ssr: false,
});

const FavoritePage: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <PrivatePage navigate={router.push}>
            <Head>
                <title>{t('Phoqer | Favorite offers')}</title>
            </Head>
            <Layout>
                <Favorite />
            </Layout>
        </PrivatePage>
    );
};

export default FavoritePage;
