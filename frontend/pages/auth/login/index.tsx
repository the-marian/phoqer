import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import { serverRedirect } from '../../../assets/helpers';
import LoginForm from '../../../components/Common/Auth/LoginForm';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';
import Meta from '../../../components/Shared/Meta';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';

const Login = (): ReactElement => {
    const T = useTrans();
    return (
        <>
            <AuthRedirect reverse />
            <Meta title={T.login} h1={T.login} />
            <AuthContainer>
                <LoginForm />
            </AuthContainer>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    serverRedirect((ctx as unknown) as GetServerSidePropsContext, null, true);
});

export default Login;
