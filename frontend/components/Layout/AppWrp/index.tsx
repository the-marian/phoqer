import axios from 'axios';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IAuth, IState } from '../../../interfaces';
import Footer from '../Footer';
import Header from '../Header';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const AppWrp = ({ children }: Props): ReactElement => {
    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);

    useEffect(() => {
        if (auth_token) {
            axios.defaults.headers.common.Authorization = `Token ${auth_token}`;
        }
    }, [auth_token]);

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default AppWrp;
