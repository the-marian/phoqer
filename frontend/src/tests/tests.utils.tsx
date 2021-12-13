import React, { ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';

import AuthProvider from '../components/context/auth/auth';
import ConfigProvider from '../components/context/config';
import MediaProvider from '../components/context/media';
import SiteTheme from '../components/context/theme';
import { IAuthResponse, IConfig, IState, Themes } from '../interfaces';
import { makeStore } from '../redux/store';
import config from '../utils/config';
import { theme } from '../utils/theming/theme';

interface ProviderProps {
    preloadedState?: IState;
    width?: number;
    auth?: IAuthResponse;
    theme?: Themes;
    config?: IConfig;
}

interface IProps {
    children: ReactElement;
}

const auth = { access_token: null };

const customRender = (ui: ReactElement, props?: ProviderProps | null, options?: RenderOptions): RenderResult => {
    const AppProviders = ({ children }: IProps): ReactElement => {
        return (
            <Provider store={makeStore(props?.preloadedState)}>
                <AuthProvider initValue={props?.auth || auth}>
                    <ConfigProvider initValue={props?.config || config.siteConfig}>
                        <MediaProvider initValue={props?.width || 1300}>
                            <SiteTheme initValue={props?.theme || 'white'}>
                                <ThemeProvider theme={theme(props?.theme || 'white')}>{children}</ThemeProvider>
                            </SiteTheme>
                        </MediaProvider>
                    </ConfigProvider>
                </AuthProvider>
            </Provider>
        );
    };

    return render(ui, {
        wrapper: AppProviders,
        ...options,
    } as RenderOptions);
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
