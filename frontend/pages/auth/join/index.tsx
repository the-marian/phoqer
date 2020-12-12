import Head from 'next/head';
import React, { ReactElement } from 'react';

import JoinForm from '../../../components/Common/Auth/JoinForm';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';

const Login = (): ReactElement => (
    <>
        <Head>
            <title>Join | Phoqer</title>
        </Head>
        <AuthContainer>
            <JoinForm />
        </AuthContainer>
    </>
);

export default Login;
