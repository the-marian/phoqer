import '../styles/index.css';

import React, { ReactElement, useEffect } from 'react';

import axios from 'axios';
import App, { AppProps } from 'next/app';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { Head } from 'next/document';
import { Router } from 'next/router';
import { useDispatch } from 'react-redux';

import { modal } from '../components/common/modal';
import RootProvider from '../components/context/root-provider';
import Root from '../components/layout/root';
import { IAuth, IConfig, Themes } from '../interfaces';
import { wrapper } from '../redux/store';
import { parseCookie } from '../utils/helpers';
import interceptors from '../utils/interceptors';

interface IProps {
    width: number;
    auth: IAuth | null;
    theme: Themes | null;
    config: IConfig | null;
}

const PhoqerApp = ({ Component, pageProps, width, auth, theme, config }: AppProps & IProps): ReactElement => {
    const dispatch = useDispatch();
    interceptors(dispatch);

    useEffect(() => {
        const handleClear = () => {
            modal.close();
            window.scrollTo({ top: 0, behavior: 'auto' });
        };
        Router.events.on('routeChangeStart', handleClear);
        return () => {
            Router.events.off('routeChangeStart', handleClear);
        };
    }, []);

    // clear server side styles
    useEffect(() => {
        const style = document.getElementById('server-side-styles');
        if (style) style?.parentNode?.removeChild(style);
    }, []);

    return (
        <>
            <Head>
                <title>Phoqer</title>
                {process.env.NODE_ENV === 'production' && !process.browser && (
                    <>
                        <script
                            async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2424155820333209"
                            crossOrigin="anonymous"
                        />
                        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B57V56EVR8" />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'G-B57V56EVR8');`,
                            }}
                        />
                    </>
                )}
            </Head>
            <RootProvider width={width} auth={auth} theme={theme} config={config}>
                <Root>
                    <Component {...pageProps} />
                </Root>
            </RootProvider>
        </>
    );
};

PhoqerApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const toMatch =
        /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    const isMobile = toMatch.test(appContext?.ctx?.req?.headers?.['user-agent'] || '');

    // ui
    const theme = parseCookie<Themes>(appContext?.ctx?.req?.headers?.cookie, 'phoqer_theme', true);
    const props = await App.getInitialProps(appContext);

    // auth-form
    const auth = parseCookie<IAuth>(appContext?.ctx?.req?.headers?.cookie);
    if (auth?.access_token) axios.defaults.headers.common.Authorization = `Bearer ${auth?.access_token}`;

    // config
    const config = parseCookie<IConfig>(appContext?.ctx?.req?.headers?.cookie, 'phoqer_config');

    // end
    return { ...props, width: isMobile ? 500 : 1400, auth, theme, config };
};

export default wrapper.withRedux(PhoqerApp);
