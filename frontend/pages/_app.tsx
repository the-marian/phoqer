import '../styles/index.css';

import App, { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createGenerateId, JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss';

import { logger, parseCookie } from '../assets/helpers';
import interceptors from '../assets/interceptors';
import { theme } from '../assets/theme';
import { modal } from '../components/Common/Modal';
import AuthProvider from '../components/HOC/Auth/AuthContext';
import PageLayout from '../components/Layout/PageLayout';
import { IAuth } from '../interfaces';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps, auth }: AppProps & { auth: IAuth }): ReactElement => {
    const history = useRouter();
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();

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
        <JssProvider registry={sheets} generateId={generateId}>
            <ThemeProvider theme={theme}>
                <AuthProvider authServer={auth}>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                </AuthProvider>
            </ThemeProvider>
        </JssProvider>
    );
};

MyApp.getInitialProps = async appContext => {
    const props = await App.getInitialProps(appContext);
    return { ...props, token: parseCookie<IAuth>(appContext?.ctx?.req?.headers?.cookie) };
};

export default wrapper.withRedux(MyApp);
