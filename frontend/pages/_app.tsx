import '../styles/index.css';

import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createGenerateId, JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss';

import { logger } from '../assets/helpers';
import interceptors from '../assets/interceptors';
import { theme } from '../assets/theme';
import { modal } from '../components/Common/Modal';
import PageLayout from '../components/Layout/PageLayout';
import { wrapper } from '../redux/store';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
    const history = useRouter();
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();

    interceptors({ history });

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
    });

    return (
        <JssProvider registry={sheets} generateId={generateId}>
            <ThemeProvider theme={theme}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </ThemeProvider>
        </JssProvider>
    );
};

export default wrapper.withRedux(App);
