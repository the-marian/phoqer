import { FC } from 'react';

import Head from 'next/head';

import { useTranslation } from '@app/hook/translations.hook';

interface Props {
    title: string;
    description?: string;
}
export const Meta: FC<Props> = ({
    title,
    description = 'Is an online advertising platform that brings people together to exchange goods and services',
}) => {
    const { t } = useTranslation();

    return (
        <Head>
            <title>{t(title)}</title>
            <meta name="title" content={t(title)} />
            <meta property="twitter:title" content={t(title)} />
            <meta name="apple-mobile-web-app-title" content={t(title)} />

            <meta name="description" content={t(description)} />
            <meta property="og:description" content={t(description)} />
            <meta property="twitter:description" content={t(description)} />
            <meta name="description" content={t(description)} />

            <link href="/manifest.json" rel="manifest" />
        </Head>
    );
};
