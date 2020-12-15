// TEMP - rebase to styles folder
// from this
import '@uppy/core/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
// to this moment
import '../styles/fonts.css';
import '../styles/normalize.css';
import '../styles/styles.css';
import '../styles/range.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createGenerateId, JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss';
import { useStore } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { logger } from '../assets/helpers';
import interceptors from '../assets/interceptors';
import { theme } from '../assets/theme';
import ModalComponent, { modal } from '../components/Common/Modal';
import FullPage from '../components/Common/Preloaders/FullPage';
import AuthHOC from '../components/HOC/AuthHOC';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { wrapper } from '../redux/store';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
    const store = useStore();
    const history = useRouter();
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();

    const persist = persistStore(store);
    interceptors({ history });

    Router.events.on('routeChangeComplete', () => {
        logger();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        modal.close();
    });

    return (
        <PersistGate loading={null} persistor={persist}>
            <JssProvider registry={sheets} generateId={generateId}>
                <ThemeProvider theme={theme}>
                    <Head>
                        <title>Phoqer</title>
                        <meta name="viewport" content="width=device-width,initial-scale=1" />
                    </Head>
                    <AuthHOC>
                        <Header />
                        <ModalComponent />
                        <FullPage />
                        <Component {...pageProps} />
                        <Footer />
                    </AuthHOC>
                </ThemeProvider>
            </JssProvider>
        </PersistGate>
    );
};

export default wrapper.withRedux(App);
