import { NextPage } from 'next';
import { Text } from 'phoqer';

import { Layout } from '@app/components/layout/layout';
import { NotFound } from '@app/components/not-found/not-found';
import { useTranslation } from '@app/hook/translations.hook';

const NotFoundPage: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <NotFound>
                <Text size="sm">{t('This page is not exist')}</Text>
            </NotFound>
        </Layout>
    );
};

export default NotFoundPage;
