import 'phoqer/dist/styles/root.scss';

import { useEffect } from 'react';

import type { AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/shared/lib/utils';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { useScreenHeight, ToastProvider } from 'phoqer';
import { changeLocale, AuthContextProvider, THEME_KEY, ThemeContextProvider, Cookies } from 'phoqer-shared';

import { MetaIcons } from '@app/components/meta/icons';
import { TOKEN_KEY } from '@app/constants/auth.constants';
import { ScrollProvider } from '@app/context/scroll.context';
import { useTranslation } from '@app/hook/translations.hook';
import { usersService } from '@app/services/users.service';

const AuthModal = dynamic(() => import('../components/modals/auth-modal/auth-modal').then(module => module.AuthModal), {
    ssr: false,
});

const title = 'Phoqer | Rental platform';

const PhoqerApp = ({ Component, pageProps }: AppProps<Record<'theme', string>>) => {
    useScreenHeight();
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        const handler = ({ detail }: CustomEvent<string>): void => {
            router.push(router.pathname, router.asPath, { locale: detail, scroll: false });
        };

        changeLocale.subscribe(handler as EventListener);
        return () => {
            changeLocale.unsubscribe(handler as EventListener);
        };
    }, [router]);

    return (
        <>
            <Head>
                <title>{t(title)}</title>
                <meta name="title" content={t(title)} />
                <meta property="twitter:title" content={t(title)} />
                <meta name="apple-mobile-web-app-title" content={t(title)} />
                <meta name="description" content={t('site_desc')} />
                <meta property="og:description" content={t('site_desc')} />
                <meta property="twitter:description" content={t('site_desc')} />
                <meta name="description" content={t('site_desc')} />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />

                <MetaIcons />
            </Head>

            <ThemeContextProvider value={pageProps.theme}>
                <ToastProvider>
                    <AuthContextProvider tokenKey={TOKEN_KEY} http={usersService.getUser}>
                        <ScrollProvider>
                            <AuthModal />
                            <Component {...pageProps} />
                        </ScrollProvider>
                    </AuthContextProvider>
                </ToastProvider>
            </ThemeContextProvider>
        </>
    );
};

PhoqerApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<AppInitialProps> => {
    const props = await App.getInitialProps(appContext);
    const { cookie } = appContext.ctx.req?.headers ?? {};

    return { ...props, pageProps: { ...props.pageProps, theme: Cookies.decode(cookie)[THEME_KEY] } };
};

export default PhoqerApp;
