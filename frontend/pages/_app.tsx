import '../styles/index.css';

import App, { AppProps } from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router, useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logger, parseCookie } from '../assets/helpers';
import interceptors from '../assets/interceptors';
import { modal } from '../components/Common/Modal';
import AuthProvider from '../components/HOC/Auth/AuthContext';
import MediaProvider from '../components/HOC/Media';
import SiteTheme from '../components/HOC/SiteTheme';
import PageLayout from '../components/Layout/PageLayout';
import { IAuth } from '../interfaces';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps, width, auth }: AppProps & { width: number; auth: IAuth }): ReactElement => {
    const history = useRouter();
    const dispatch = useDispatch();

    interceptors({ history, dispatch });
    logger();

    useEffect(() => {
        const handleClear = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            modal.close();
        };
        Router.events.on('routeChangeComplete', handleClear);

        return () => {
            Router.events.off('routeChangeComplete', handleClear);
        };
    }, []);

    return (
        <SiteTheme siteTheme={'white'}>
            <AuthProvider authServer={auth}>
                <MediaProvider width={width}>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                </MediaProvider>
            </AuthProvider>
        </SiteTheme>
    );
};

MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
    const toMatch = /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    const isMobile = toMatch.test(appContext?.ctx?.req?.headers?.['user-agent'] || '');

    const props = await App.getInitialProps(appContext);
    const auth = parseCookie<IAuth>(appContext?.ctx?.req?.headers?.cookie);
    return { ...props, width: isMobile ? 500 : 1400, auth };
};

export default wrapper.withRedux(MyApp);
