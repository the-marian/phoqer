import Head from 'next/head';
import React, { ReactElement } from 'react';

import LoginForm from '../../../components/Common/Auth/LoginForm';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';

const Login = (): ReactElement => (
    <>
        <Head>
            <title>Login | Phoqer</title>
        </Head>
        <AuthContainer>
            <LoginForm />
        </AuthContainer>
    </>
);

export default Login;
