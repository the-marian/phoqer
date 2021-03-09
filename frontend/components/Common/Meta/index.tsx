import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import config from '../../../assets/config';
import useTrans from '../../../hooks/trans.hook';

const useStyles = createUseStyles({
    title: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 0,
        opacity: 0,
    },
});

interface IProps {
    title?: string;
    description?: string;
    keywords?: string;
    icon?: string;
    h1?: string;
}

const Meta = ({ title, description, keywords, icon, h1 = '' }: IProps): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    const T = useTrans();

    const locale = history.locale === history.defaultLocale ? '' : history.locale + '/';
    const url = (lang: string): string => config.host + lang + history.pathname.replace('/', '');

    return (
        <>
            <Head>
                <title>{title ? `${title} | Phoqer` : 'Phoqer'}</title>

                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="description" content={description || T.site_desc} />
                <meta name="keywords" content={`${T.keywords} ${keywords || ''}`} />
                <meta name="title" content={title ? `${title} | Phoqer` : 'Phoqer'} />
                <meta name="robots" content="index,follow" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:description" content={description || T.site_desc} />
                <meta name="twitter:image:src" content={icon || config.host + 'about.jpg'} />
                <meta name="twitter:site" content="@Phoqer" />
                <meta name="twitter:title" content={title ? `${title} | Phoqer` : 'Phoqer'} />

                <meta property="og:description" content={description || T.site_desc} />
                <meta property="og:image" content={icon || config.host + 'about.jpg'} />
                <meta property="og:site_name" content="Phoqer" />
                <meta property="og:title" content={title ? `${title} | Phoqer` : 'Phoqer'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url(locale)} />

                <meta name="parsely-link" content={url(locale)} />

                <meta name="theme-color" content="007aff" />
                <link rel="manifest" href="/manifest.json" />
                <link href="/phoqer-72.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/phoqer-72.png" rel="icon" type="image/png" sizes="32x32" />
                <link href="/phoqer-72.png" rel="icon" type="image/png" sizes="72x72" />
                <link href="/phoqer-96.png" rel="icon" type="image/png" sizes="96x96" />
                <link href="/phoqer-128.png" rel="icon" type="image/png" sizes="128x128" />
                <link href="/phoqer-144.png" rel="icon" type="image/png" sizes="144x144" />
                <link href="/phoqer-152.png" rel="icon" type="image/png" sizes="152x152" />
                <link href="/phoqer-192.png" rel="icon" type="image/png" sizes="192x192" />
                <link href="/phoqer-384.png" rel="icon" type="image/png" sizes="384x384" />
                <link href="/phoqer-512.png" rel="icon" type="image/png" sizes="512x512" />

                <link rel="apple-touch-icon" href="/phoqer-512.png" />
                <link href="/phoqer-72.png" rel="apple-touch-icon" type="image/png" sizes="16x16" />
                <link href="/phoqer-72.png" rel="apple-touch-icon" type="image/png" sizes="32x32" />
                <link href="/phoqer-72.png" rel="apple-touch-icon" type="image/png" sizes="72x72" />
                <link href="/phoqer-96.png" rel="apple-touch-icon" type="image/png" sizes="96x96" />
                <link href="/phoqer-128.png" rel="apple-touch-icon" type="image/png" sizes="128x128" />
                <link href="/phoqer-144.png" rel="apple-touch-icon" type="image/png" sizes="144x144" />
                <link href="/phoqer-152.png" rel="apple-touch-icon" type="image/png" sizes="152x152" />
                <link href="/phoqer-192.png" rel="apple-touch-icon" type="image/png" sizes="192x192" />
                <link href="/phoqer-384.png" rel="apple-touch-icon" type="image/png" sizes="384x384" />
                <link href="/phoqer-512.png" rel="apple-touch-icon" type="image/png" sizes="512x512" />

                <link rel="mask-icon" href="/phoqer-512.png" color="#171717" />

                <link rel="canonical" href={url(locale)} />
                <link rel="alternate" hrefLang="x-default" href={url('')} />
                <link rel="alternate" hrefLang="en" href={url('en/')} />
                <link rel="alternate" hrefLang="ru" href={url('ru/')} />
            </Head>
            <h1 className={css.title}>{(h1 || '') + T.site_desc}</h1>
        </>
    );
};

export default Meta;
