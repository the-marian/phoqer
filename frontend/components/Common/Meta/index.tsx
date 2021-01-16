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
                'Read and share ideas. A website that combines the features of a social network and a collective blog, created to publish news, analytical articles, opinions related to information technology, business and the Internet.'
            }
        />
        <meta name="keywords" content={`blog network socials read ${keywords}`} />
        <title>{title || 'Blog Application'}</title>
        <meta name="title" content={title || 'Blog Application'} />
        <meta name="robots" content="index,follow" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
            name="twitter:description"
            content={
                description ||
                'Read and share ideas. A website that combines the features of a social network and a collective blog, created to publish news, analytical articles, opinions related to information technology, business and the Internet.'
            }
        />
        <meta name="twitter:image:src" content={icon || config.host + '/about.jpg'} />
        <meta name="twitter:site" content="@BlogApp" />
        <meta name="twitter:title" content={title || 'Blog Application'} />

        <meta
            property="og:description"
            content={
                description ||
                'Read and share ideas. A website that combines the features of a social network and a collective blog, created to publish news, analytical articles, opinions related to information technology, business and the Internet.'
            }
        />
        <meta property="og:image" content={icon || config.host + '/about.jpg'} />
        <meta property="og:site_name" content="BlogApp" />
        <meta property="og:title" content={title || 'Blog Application'} />
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
