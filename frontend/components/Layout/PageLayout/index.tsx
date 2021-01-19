import React, { ReactElement } from 'react';

import ModalComponent from '../../Common/Modal';
import FullPageLoader from '../../Common/Preloaders/FullPage';
import AuthInterceptor from '../../HOC/Auth/AuthInterceptor';
import Footer from '../Footer';
import Header from '../Header';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: IProps): ReactElement => {
    return (
        <>
            <AuthInterceptor />
            <Header />
            <ModalComponent />
            <FullPageLoader />
            {children}
            <Footer />
        </>
    );
};

export default PageLayout;
