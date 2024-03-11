import { FC } from 'react';

import Head from 'next/head';

interface Props {
    title: string;
    description?: string;
}
export const Meta: FC<Props> = ({
    title,
    description = 'PHOQER - Is an online advertising platform that brings people together to exchange goods and services',
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="twitter:title" content={title} />
            <meta name="apple-mobile-web-app-title" content={title} />

            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
            <meta name="description" content={description} />

            <link href="/manifest.json" rel="manifest" />
        </Head>
    );
};
