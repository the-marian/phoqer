import React, { ReactElement, useEffect } from 'react';
import { ThemeProvider } from 'react-jss';

import { theme } from '../../../assets/theme';
import useTheme from '../../../hooks/theme.hook';
import ModalComponent from '../../common/modal';
import RouterProgress from '../../common/preloaders/progress/router-progress';
import AuthInterceptor from '../../context/auth/auth-interceptor';
import MainDrawer from '../main-drawer';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const Root = ({ children }: IProps): ReactElement => {
    const [siteTheme] = useTheme();

    useEffect(() => {
        if (process.browser && /windows/i.test(window.navigator.userAgent) && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add('windows');
        }
    }, []);

    return (
        <ThemeProvider theme={theme(siteTheme)}>
            <AuthInterceptor />
            <ModalComponent />
            <MainDrawer />
            <RouterProgress />
            {children}
        </ThemeProvider>
    );
};

export default Root;
