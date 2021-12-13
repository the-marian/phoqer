import '../styles/index.css';

import React, { ReactElement, useEffect } from 'react';

import App, { AppProps } from 'next/app';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';

import { modal } from '../components/common/modal';
import AuthProvider from '../components/context/auth/auth';
import ConfigProvider from '../components/context/config';
import MediaProvider from '../components/context/media';
import SiteTheme from '../components/context/theme';
import Root from '../components/layout/root';
import { PHOQER_CONFIG, PHOQER_THEME } from '../constant/cookie.constant';
import { IAuthResponse, IConfig, Themes } from '../interfaces';
import { wrapper } from '../redux/store';
import appConfig from '../utils/config';
import { parseCookie } from '../utils/helpers';
import api from '../utils/interceptors';

interface IProps {
    width: number;
    auth: IAuthResponse;
    theme: Themes;
    config: IConfig;
}

const PhoqerApp = ({ Component, pageProps, width, auth, theme, config }: AppProps & IProps): ReactElement => {
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
        <AuthProvider initValue={auth}>
            <ConfigProvider initValue={config}>
                <MediaProvider initValue={width}>
                    <SiteTheme initValue={theme}>
                        <Root>
                            <Component {...pageProps} />
                        </Root>
                    </SiteTheme>
                </MediaProvider>
            </ConfigProvider>
        </AuthProvider>
    );
};

PhoqerApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const props = await App.getInitialProps(appContext);
    const headers = appContext?.ctx?.req?.headers;

    const toMatch =
        /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    const isMobile = toMatch.test(headers?.['user-agent'] || '');

    const theme = parseCookie<Themes>(headers?.cookie, PHOQER_THEME, true) || 'white';
    const config = parseCookie<IConfig>(headers?.cookie, PHOQER_CONFIG) || appConfig.siteConfig;
    const auth = parseCookie<IAuthResponse>(headers?.cookie) || { access_token: null };
    api.defaults.headers.common.Authorization = auth?.access_token || null;

    return { ...props, width: isMobile ? 500 : 1400, auth, theme, config };
};

export default wrapper.withRedux(PhoqerApp);
