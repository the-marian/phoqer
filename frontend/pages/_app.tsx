import '../styles/fonts.css';
import '../styles/normalize.css';
import '../styles/styles.css';
import '../styles/range.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createGenerateId, JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss';
import { useStore } from 'react-redux';
import { persistStore } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import { PersistGate } from 'redux-persist/integration/react';

import Modal from '../components/Base/Modal';
import FullPage from '../components/Base/Preloaders/FullPage';
import interceptors from '../config/interceptors';
import { theme } from '../config/theme';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
    const store = useStore();
    const history = useRouter();
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();

    const resistor: Persistor = persistStore(store, {}, () => {
        resistor.persist();
    });
    interceptors({ history });

    return (
        <PersistGate loading={null} persistor={resistor}>
            <JssProvider registry={sheets} generateId={generateId}>
                <ThemeProvider theme={theme}>
                    <Modal />
                    <FullPage />
                    <Head>
                        <meta name="viewport" content="width=device-width,initial-scale=1" />
                    </Head>
                    <Component {...pageProps} />
                </ThemeProvider>
            </JssProvider>
        </PersistGate>
    );
};

export default wrapper.withRedux(MyApp);
