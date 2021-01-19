import React, { ReactElement } from 'react';

import LoginForm from '../../../components/Common/Auth/LoginForm';
import Meta from '../../../components/Common/Meta';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';

const Login = (): ReactElement => (
    <>
        <Meta title="Login | Phoqer" />
        <AuthContainer>
            <LoginForm />
        </AuthContainer>
    </>
);

export default Login;
