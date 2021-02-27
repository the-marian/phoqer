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
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="description" content={description || T.site_desc} />
                <meta name="keywords" content={`${T.keywords} ${keywords || ''}`} />
                <title>{title ? `${title} | Phoqer` : 'Phoqer'}</title>
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
                <link rel="apple-touch-icon" href={icon || config.host + 'about.jpg'} />
                <link rel="apple-touch-icon" sizes="152x152" href={icon || config.host + 'about.jpg'} />
                <link rel="apple-touch-icon" sizes="120x120" href={icon || config.host + 'about.jpg'} />
                <link rel="apple-touch-icon" sizes="76x76" href={icon || config.host + 'about.jpg'} />
                <link rel="apple-touch-icon" sizes="60x60" href={icon || config.host + 'about.jpg'} />
                <link rel="mask-icon" href={icon || config.host + 'about.jpg'} color="#171717" />
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
