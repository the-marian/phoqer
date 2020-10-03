import '../styles/fonts.css';
import '../styles/normalize.css';
import '../styles/styles.css';

import { AppProps } from 'next/app';
import React from 'react';
import {
  createGenerateId,
  JssProvider,
  SheetsRegistry,
  ThemeProvider,
} from 'react-jss';

import Modal from '../components/common/Modal';
import FullPage from '../components/common/Preloaders/FullPage';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { theme } from '../config/theme';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();

  return (
    <JssProvider registry={sheets} generateId={generateId}>
      <ThemeProvider theme={theme}>
        <Modal />
        <FullPage />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </JssProvider>
  );
};

export default wrapper.withRedux(MyApp);
