import '../styles/index.css';

import axios from 'axios';
import App, { AppProps } from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router, useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logger, parseCookie } from '../assets/helpers';
import interceptors from '../assets/interceptors';
import { modal } from '../components/Common/Modal';
import AuthProvider from '../components/Context/Auth/AuthContext';
import MediaProvider from '../components/Context/Media';
import SiteTheme from '../components/Context/SiteTheme';
import Root from '../components/Layout/Root';
import { IAuth, Themes } from '../interfaces';
import { wrapper } from '../redux/store';

interface IProps {
    width: number;
    auth: IAuth | null;
    theme: Themes | null;
}
const MyApp = ({ Component, pageProps, width, auth, theme }: AppProps & IProps): ReactElement => {
    const history = useRouter();
    const dispatch = useDispatch();

    interceptors({ history, dispatch });
    logger();

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

    return (
        <SiteTheme siteTheme={theme === 'black' ? 'black' : 'white'}>
            <AuthProvider authServer={auth}>
                <MediaProvider width={width}>
                    <Root>
                        <Component {...pageProps} />
                    </Root>
                </MediaProvider>
            </AuthProvider>
        </SiteTheme>
    );
};

MyApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const toMatch = /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    const isMobile = toMatch.test(appContext?.ctx?.req?.headers?.['user-agent'] || '');

    // ui
    const theme = parseCookie<Themes>(appContext?.ctx?.req?.headers?.cookie, 'phoqer_theme', true);
    const props = await App.getInitialProps(appContext);

    // auth
    const auth = parseCookie<IAuth>(appContext?.ctx?.req?.headers?.cookie);
    if (auth?.access_token) axios.defaults.headers.common.Authorization = `Bearer ${auth?.access_token}`;

    // end
    return { ...props, width: isMobile ? 500 : 1400, auth, theme };
};

export default wrapper.withRedux(MyApp);
