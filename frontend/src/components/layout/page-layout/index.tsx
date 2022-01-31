import React, { ReactElement } from 'react';

import ScrollTop from '../../common/scroll-top-btn';
import Footer from '../footer';
import Header from '../header';
import Main from '../tag-main';

interface IProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const PageLayout = ({ children, className }: IProps): ReactElement => {
    return (
        <>
            <Header />
            <Main className={className}>{children}</Main>
            <ScrollTop />
            <Footer />
        </>
    );
};

export default PageLayout;
