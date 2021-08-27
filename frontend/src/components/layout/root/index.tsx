import React, { ReactElement, useEffect } from 'react';

import { ThemeProvider } from 'react-jss';
import ReactNotification from 'react-notifications-component';

import useConfig from '../../../hooks/config.hook';
import useTheme from '../../../hooks/theme.hook';
import { theme } from '../../../utils/theming/theme';
import RouterProgress from '../../common/loaders/progress/router-progress';
import ModalComponent from '../../common/modal';
import notifications from '../../common/notifications';
import ConstructionMessage from '../../common/notifications/messages/construction';
import AuthInterceptor from '../../context/auth/auth-interceptor';
import MainDrawer from '../main-drawer';
import MobileNav from '../mobile-nav';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const Root = ({ children }: IProps): ReactElement => {
    const [siteTheme] = useTheme();
    const [config] = useConfig();

    useEffect(() => {
        if (process.browser && !/mac/i.test(window.navigator.userAgent) && document.querySelector('html')) {
            document.querySelector('html')?.classList?.add('windows');
        }
    }, []);

    useEffect(() => {
        if (config?.warning) {
            notifications.warning({
                message: <ConstructionMessage />,
                options: {
                    id: 'construction-message',
                    dismiss: {
                        duration: 5_000_000,
                        showIcon: true,
                        click: true,
                    },
                },
            });
        }
    }, [config]);

    return (
        <ThemeProvider theme={theme(siteTheme)}>
            <AuthInterceptor />
            <RouterProgress />
            <ModalComponent />
            <MainDrawer />
            <MobileNav />
            <ReactNotification />
            {children}
        </ThemeProvider>
    );
};

export default Root;
