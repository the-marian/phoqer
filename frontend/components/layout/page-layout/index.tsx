import React, { ReactElement } from 'react';

import Footer from '../footer';
import Header from '../header';
import Main from '../tag-main';

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
