import Head from 'next/head';
import React, { ReactElement } from 'react';

import ForgotPassForm from '../../../components/Common/Auth/ForgotPassForm';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';

const ForgotPass = (): ReactElement => (
    <>
        <Head>
            <title>Reset password | Phoqer</title>
        </Head>
        <AuthContainer>
            <ForgotPassForm />
        </AuthContainer>
    </>
);

export default ForgotPass;
