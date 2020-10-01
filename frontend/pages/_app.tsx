import React from 'react';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import {
  ThemeProvider,
  JssProvider,
  SheetsRegistry,
  createGenerateId,
} from 'react-jss';
import { wrapper } from '../redux/store';
import { theme } from '../config/theme';

import '../styles/fonts.css';
import '../styles/normalize.css';
import '../styles/styles.css';

interface IProps {
  Component: NextComponentType<NextPageContext, {}, any>;
  pageProps: AppProps;
}

const App = ({ Component, pageProps }: IProps) => {
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();

  return (
    <JssProvider registry={sheets} generateId={generateId}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </JssProvider>
  );
};

export default wrapper.withRedux(App);
