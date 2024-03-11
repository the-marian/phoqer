import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Text } from 'phoqer';
import { PrivatePage } from 'phoqer-shared';

import { InjectModule } from '@app/components/inject-module/inject-module';
import { Layout } from '@app/components/layout/layout';
import { NotFound } from '@app/components/not-found/not-found';
import { useTranslation } from '@app/hook/translations.hook';

import css from './styles.module.scss';

const service = () => import('author/root');

const Author: NextPage = () => {
    const routes = useRouter();
    const { t } = useTranslation();

    return (
        <PrivatePage navigate={routes.push}>
            <Head>
                <title>{t('Phoqer | Author dashboard')}</title>
            </Head>

            <Layout className={css.root}>
                <InjectModule module={service}>
                    <NotFound>
                        <Text>{t('This page is not exist')}</Text>
                    </NotFound>
                </InjectModule>
            </Layout>
        </PrivatePage>
    );
};

export default Author;
