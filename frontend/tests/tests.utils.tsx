import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'react-jss';

import { theme } from '../assets/theme';
import useTheme from '../hooks/theme.hook';
import { IAuth, IConfig, Themes } from '../interfaces';
import { wrapper } from '../redux/store';

interface IProps {
    width: number;
    auth: IAuth | null;
    theme: Themes | null;
    config: IConfig | null;
    children: ReactElement;
}

const AppProviders = ({ children }: IProps): ReactElement => {
    const [siteTheme] = useTheme();
    return <ThemeProvider theme={theme(siteTheme)}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options: RenderOptions): RenderResult =>
    render(ui, { wrapper: wrapper.withRedux(AppProviders), ...options } as RenderOptions);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
