import React, { ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'react-jss';
import { Provider } from 'react-redux';

import RootProvider from '../components/context/root-provider';
import { IAuth, IConfig, IState, Themes } from '../interfaces';
import { makeStore } from '../redux/store';
import { theme } from '../utils/theming/theme';

interface ProviderProps {
    preloadedState?: IState;
    width?: number;
    auth?: IAuth | null;
    theme?: Themes | null;
    config?: IConfig | null;
}

interface IProps {
    children: ReactElement;
}

const customRender = (ui: ReactElement, props?: ProviderProps | null, options?: RenderOptions): RenderResult => {
    const AppProviders = ({ children }: IProps): ReactElement => {
        return (
            <Provider store={makeStore(props?.preloadedState)}>
                <RootProvider
                    width={props?.width || 1400}
                    auth={props?.auth || null}
                    theme={props?.theme || null}
                    config={props?.config || null}
                >
                    <ThemeProvider theme={theme(props?.theme || 'white')}>{children}</ThemeProvider>
                </RootProvider>
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
