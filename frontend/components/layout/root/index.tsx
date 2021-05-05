import React, { ReactElement, useEffect } from 'react';
import { ThemeProvider } from 'react-jss';
import ReactNotification from 'react-notifications-component';

import { theme } from '../../../assets/theme';
import useConfig from '../../../hooks/config.hook';
import useTheme from '../../../hooks/theme.hook';
import RouterProgress from '../../common/loaders/progress/router-progress';
import MobileNav from '../../common/mobile-nav';
import ModalComponent from '../../common/modal';
import notifications from '../../common/notifications';
import ConstructionMessage from '../../common/notifications/Messages/construction';
import AuthInterceptor from '../../context/auth/auth-interceptor';
import MainDrawer from '../main-drawer';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const Root = ({ children }: IProps): ReactElement => {
    const [siteTheme] = useTheme();
    const [config] = useConfig();

    useEffect(() => {
        if (process.browser && /windows/i.test(window.navigator.userAgent) && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add('windows');
        }
    }, []);

    useEffect(() => {
        if (config?.warning) {
            notifications.warning({
                message: <ConstructionMessage />,
                options: { id: 'construction-message' },
            });
        }
    }, [config]);

    return (
        <ThemeProvider theme={theme(siteTheme)}>
            <AuthInterceptor />
            <ModalComponent />
            <MainDrawer />
            <RouterProgress />
            <MobileNav />
            <ReactNotification />
            {children}
        </ThemeProvider>
    );
};

export default Root;
