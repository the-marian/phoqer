import { NextPage } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';

import { env } from '@app/config/env.config';

const siteName = 'Phoqer';
const keywords = 'keywords';

const Document: NextPage = () => {
    return (
        <Html>
            <Head>
                {/*Primary meta Tags*/}
                <meta name="keywords" content={keywords} />
                <meta name="robots" content="index,follow" />

                {/*Open Graph / Facebook*/}
                <meta property="og:url" content={env.PHOQER_HOST} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Phoqer | Rental platform" />
                <meta property="og:image" content="/about.jpg" />
                <meta property="og:site_name" content="Phoqer" />

                {/*Twitter*/}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={env.PHOQER_HOST} />
                <meta property="twitter:image" content={'/about.jpg'} />

                {/* PWA */}
                <meta name="application-name" content={siteName} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-tap-highlight" content="yes" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Open+Sans:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&display=swap"
                />
            </Head>
            <body className="animate">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
