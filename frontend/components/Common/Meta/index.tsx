import Head from 'next/head';
import React, { ReactElement } from 'react';

import config from '../../../assets/config';

interface IProps {
    title?: string;
    description?: string;
    keywords?: string;
    icon?: string;
}

const Meta = ({ title, description, keywords, icon }: IProps): ReactElement => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
        <meta
            name="description"
            content={
                description ||
                'PHOQER is an online advertising platform that brings people together to share goods and services. PHOQER - here you will find what you are looking for! By clicking the Submit Ad button, you will be able to place ads on any topic easily and quickly.'
            }
        />
        <meta name="keywords" content={`phoqer share goods services ad ${keywords}`} />
        <title>{title ? `${title} | Phoqer` : 'Phoqer'}</title>
        <meta name="title" content={title ? `${title} | Phoqer` : 'Phoqer'} />
        <meta name="robots" content="index,follow" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
            name="twitter:description"
            content={
                description ||
                'PHOQER is an online advertising platform that brings people together to share goods and services. PHOQER - here you will find what you are looking for! By clicking the Submit Ad button, you will be able to place ads on any topic easily and quickly.'
            }
        />
        <meta name="twitter:image:src" content={icon || config.host + '/about.jpg'} />
        <meta name="twitter:site" content="@Phoqer" />
        <meta name="twitter:title" content={title ? `${title} | Phoqer` : 'Phoqer'} />

        <meta
            property="og:description"
            content={
                description ||
                'PHOQER is an online advertising platform that brings people together to share goods and services. PHOQER - here you will find what you are looking for! By clicking the Submit Ad button, you will be able to place ads on any topic easily and quickly.'
            }
        />
        <meta property="og:image" content={icon || config.host + '/about.jpg'} />
        <meta property="og:site_name" content="Phoqer" />
        <meta property="og:title" content={title ? `${title} | Phoqer` : 'Phoqer'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={config.host} />

        <meta name="parsely-link" content={config.host} />
        <link rel="apple-touch-icon" href={icon || config.host + '/about.jpg'} />
        <link rel="apple-touch-icon" sizes="152x152" href={icon || config.host + '/about.jpg'} />
        <link rel="apple-touch-icon" sizes="120x120" href={icon || config.host + '/about.jpg'} />
        <link rel="apple-touch-icon" sizes="76x76" href={icon || config.host + '/about.jpg'} />
        <link rel="apple-touch-icon" sizes="60x60" href={icon || config.host + '/about.jpg'} />
        <link rel="mask-icon" href={icon || config.host + '/about.jpg'} color="#171717" />
        <link rel="canonical" href={config.host} />
    </Head>
);

export default Meta;
