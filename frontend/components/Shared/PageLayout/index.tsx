import React, { ReactElement } from 'react';

import Footer from '../Footer';
import Header from '../Header';
import Main from '../TagMain';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const PageLayout = ({ children }: IProps): ReactElement => (
    <>
        <Header />
        <Main>{children}</Main>
        <Footer />
    </>
);

export default PageLayout;
