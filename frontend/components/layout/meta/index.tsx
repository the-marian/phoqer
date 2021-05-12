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
    icon?: string | null;
    h1?: string;
}

const Meta = ({ title, description, keywords, icon, h1 = '' }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();

    const url = (lang = 'pl'): string => config.host(lang);

    return (
        <>
            <Head>
                {/*Global site tag (gtag.js) - Google Analytics*/}
                {process.env.NODE_ENV === 'production' && (
                    <>
                        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B57V56EVR8" />
                        <script>
                            {`window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-B57V56EVR8');`}
                        </script>
                    </>
                )}

                {/*Primary meta Tags*/}
                <title>{title?.trim() ? `${title} | Phoqer` : 'Phoqer'}</title>
                <meta name="title" content={title?.trim() ? `${title} | Phoqer` : 'Phoqer'} />
                <meta name="description" content={description || trans('site_desc')} />

                {/*Internal meta Tags*/}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <meta name="keywords" content={`${trans('keywords')} ${keywords || ''}`} />
                <meta name="robots" content="index,follow" />

                {/*Open Graph / Facebook*/}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url(history.locale)} />
                <meta property="og:title" content={title?.trim() ? `${title} | Phoqer` : 'Phoqer'} />
                <meta property="og:description" content={description || trans('site_desc')} />
                <meta property="og:image" content={icon || `${url()}/about.jpg`} />
                <meta property="og:url" content={url(history.locale)} />
                <meta property="og:site_name" content="Phoqer" />

                {/*Twitter*/}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={url(history.locale)} />
                <meta property="twitter:title" content={title?.trim() ? `${title} | Phoqer` : 'Phoqer'} />
                <meta property="twitter:description" content={description || trans('site_desc')} />
                <meta property="twitter:image" content={icon || `${url()}/about.jpg`} />

                <meta name="parsely-link" content={url(history.locale)} />

                <meta name="theme-color" content="007aff" />
                <link href="/manifest.json" rel="manifest" />
                <link href={icon || `${url()}/icons/icon-512.png`} rel="icon" type="image/png" />
                <link href="/icons/icon-72.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icons/icon-72.png" rel="icon" type="image/png" sizes="32x32" />
                <link href="/icons/icon-72.png" rel="icon" type="image/png" sizes="72x72" />
                <link href="/icons/icon-96.png" rel="icon" type="image/png" sizes="96x96" />
                <link href="/icons/icon-128.png" rel="icon" type="image/png" sizes="128x128" />
                <link href="/icons/icon-144.png" rel="icon" type="image/png" sizes="144x144" />
                <link href="/icons/icon-152.png" rel="icon" type="image/png" sizes="152x152" />
                <link href="/icons/icon-192.png" rel="icon" type="image/png" sizes="192x192" />
                <link href="/icons/icon-384.png" rel="icon" type="image/png" sizes="384x384" />
                <link href="/icons/icon-512.png" rel="icon" type="image/png" sizes="512x512" />

                <link href="/icons/icon-512.png" rel="apple-touch-icon" />
                <link href="/icons/icon-72.png" rel="apple-touch-icon" type="image/png" sizes="16x16" />
                <link href="/icons/icon-72.png" rel="apple-touch-icon" type="image/png" sizes="32x32" />
                <link href="/icons/icon-72.png" rel="apple-touch-icon" type="image/png" sizes="72x72" />
                <link href="/icons/icon-96.png" rel="apple-touch-icon" type="image/png" sizes="96x96" />
                <link href="/icons/icon-128.png" rel="apple-touch-icon" type="image/png" sizes="128x128" />
                <link href="/icons/icon-144.png" rel="apple-touch-icon" type="image/png" sizes="144x144" />
                <link href="/icons/icon-152.png" rel="apple-touch-icon" type="image/png" sizes="152x152" />
                <link href="/icons/icon-192.png" rel="apple-touch-icon" type="image/png" sizes="192x192" />
                <link href="/icons/icon-384.png" rel="apple-touch-icon" type="image/png" sizes="384x384" />
                <link href="/icons/icon-512.png" rel="apple-touch-icon" type="image/png" sizes="512x512" />

                <link rel="mask-icon" href="/phoqer-512.png" color="#007aff" />

                <link rel="canonical" href={url(history.locale)} />
                <link rel="alternate" hrefLang="x-default" href={url()} />
                <link rel="alternate" hrefLang="en" href={url('en')} />
                <link rel="alternate" hrefLang="ru" href={url('ru')} />

                {/* PWA */}
                <meta name="application-name" content="Phoqer App" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={title?.trim() ? `${title} | Phoqer` : 'Phoqer'} />
                <meta name="description" content={description || trans('site_desc')} />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#007aff" />
                <meta name="msapplication-tap-highlight" content="yes" />
            </Head>
            <h1 className={css.title}>{h1 ? h1 + '. ' + trans('site_desc') : trans('site_desc')}</h1>
        </>
    );
};

export default Meta;
