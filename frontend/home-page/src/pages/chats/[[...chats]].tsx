import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Text } from 'phoqer';
import { PrivatePage } from 'phoqer-shared';

import { InjectModule } from '@app/components/inject-module/inject-module';
import { NotFound } from '@app/components/not-found/not-found';
import { useTranslation } from '@app/hook/translations.hook';

const service = () => import('chats/root');

const Chats: NextPage = () => {
    const routes = useRouter();
    const { t } = useTranslation();

    return (
        <PrivatePage navigate={routes.push}>
            <Head>
                <title>{t('Phoqer | Chats')}</title>
            </Head>

            <InjectModule module={service}>
                <NotFound>
                    <Text>{t('This page is not exist')}</Text>
                </NotFound>
            </InjectModule>
        </PrivatePage>
    );
};

export default Chats;
