import '../styles/index.css';

import App, { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { ThemeProvider } from 'react-jss';

import { logger, parseCookie } from '../assets/helpers';
import interceptors from '../assets/interceptors';
import { theme } from '../assets/theme';
import { modal } from '../components/Common/Modal';
import AuthProvider from '../components/HOC/Auth/AuthContext';
import MediaProvider from '../components/HOC/Media';
import PageLayout from '../components/Layout/PageLayout';
import { IAuth } from '../interfaces';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps, width, auth }: AppProps & { width: number; auth: IAuth }): ReactElement => {
    const history = useRouter();

    interceptors({ history });
    // logger();

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
        <ThemeProvider theme={theme}>
            <AuthProvider authServer={auth}>
                <MediaProvider width={width}>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                </MediaProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

MyApp.getInitialProps = async appContext => {
    const toMatch = [/Android/gi, /webOS/gi, /iPhone/gi, /iPad/gi, /iPod/gi, /BlackBerry/gi, /Windows Phone/gi];
    const isMobile = toMatch.some(toMatchItem => appContext?.ctx?.req?.headers?.['user-agent']?.match(toMatchItem)) || false;

    const props = await App.getInitialProps(appContext);
    return { ...props, width: isMobile ? 760 : 1400, token: parseCookie<IAuth>(appContext?.ctx?.req?.headers?.cookie) };
};

export default wrapper.withRedux(MyApp);
