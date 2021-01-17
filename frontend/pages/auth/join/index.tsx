import React, { ReactElement } from 'react';

import JoinForm from '../../../components/Common/Auth/JoinForm';
import Meta from '../../../components/Common/Meta';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';

const Login = (): ReactElement => (
    <>
        <Meta title="Join | Phoqer" />
        <AuthContainer>
            <JoinForm />
        </AuthContainer>
    </>
);

export default Login;
