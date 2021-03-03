import React, { ReactElement } from 'react';
import { ThemeProvider } from 'react-jss';

import { theme } from '../../../assets/theme';
import useTheme from '../../../hooks/theme.hook';
import Drawer from '../../Common/Drawer';
import ModalComponent from '../../Common/Modal';
import FullPageLoader from '../../Common/Preloaders/FullPage';
import AuthInterceptor from '../../HOC/Auth/AuthInterceptor';
import Footer from '../Footer';
import Header from '../Header';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: IProps): ReactElement => {
    const [siteTheme] = useTheme();
    return (
        <ThemeProvider theme={theme(siteTheme)}>
            <AuthInterceptor />
            <Header />
            <ModalComponent />
            <Drawer />
            <FullPageLoader />
            {children}
            <Footer />
        </ThemeProvider>
    );
};

export default PageLayout;
