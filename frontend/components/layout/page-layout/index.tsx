import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import ScrollTop from '../../common/scroll-top-btn';
import Footer from '../footer';
import Header from '../header';
import Main from '../tag-main';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const withPadding: { [key: string]: boolean } = {
    '/': true,
    '/offers': true,
};

const PageLayout = ({ children }: IProps): ReactElement => {
    const history = useRouter();
    return (
        <>
            <Header />
            <Main padding={!withPadding[history.route]}>{children}</Main>
            <ScrollTop />
            <Footer />
        </>
    );
};

export default PageLayout;
