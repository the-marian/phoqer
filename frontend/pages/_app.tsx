import '../styles/fonts.css';
import '../styles/normalize.css';
import '../styles/styles.css';
import '../styles/range.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import {
  createGenerateId,
  JssProvider,
  SheetsRegistry,
  ThemeProvider,
} from 'react-jss';
import { useStore } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import Modal from '../components/common/Modal';
import FullPage from '../components/common/Preloaders/FullPage';
import interceptors from '../config/interceptors';
import { theme } from '../config/theme';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const store = useStore();
  const history = useRouter();
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  interceptors({ history });

  return (
    <PersistGate loading={null} persistor={persistor}>
      <JssProvider registry={sheets} generateId={generateId}>
        <ThemeProvider theme={theme}>
          <Modal />
          <FullPage />
          <Component {...pageProps} />
        </ThemeProvider>
      </JssProvider>
    </PersistGate>
  );
};

export default wrapper.withRedux(MyApp);
