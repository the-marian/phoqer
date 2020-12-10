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
import { PersistGate } from 'redux-persist/integration/react';

import ModalComponent from '../components/Common/Modal';
import FullPage from '../components/Common/Preloaders/FullPage';
import AppWrp from '../components/Layout/AppWrp';
import interceptors from '../assets/interceptors';
import { theme } from '../assets/theme';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
    const store = useStore();
    const history = useRouter();
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();

    const persist = persistStore(store, {}, () => {
        persist.persist();
    });
    interceptors({ history });

    return (
        <PersistGate loading={null} persistor={persist}>
            <JssProvider registry={sheets} generateId={generateId}>
                <ThemeProvider theme={theme}>
                    <AppWrp>
                        <ModalComponent />
                        <FullPage />
                        <Head>
                            <title>Phocker</title>
                            <meta name="viewport" content="width=device-width,initial-scale=1" />
                        </Head>
                        <Component {...pageProps} />
                    </AppWrp>
                </ThemeProvider>
            </JssProvider>
        </PersistGate>
    );
};

export default wrapper.withRedux(MyApp);
