import React, { ReactElement } from 'react';

import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import LoginForm from '../../../components/common/auth/forms/login-form';
import Meta from '../../../components/meta';
import AuthContainer from '../../../components/pages/auth/auth-container';
import useTrans from '../../../hooks/trans.hook';

const Login = (): ReactElement => {
    const trans = useTrans();
    return (
        <AuthRedirect reverse>
            <Meta title={trans('login')} h1={trans('login')} />
            <AuthContainer>
                <LoginForm />
            </AuthContainer>
        </AuthRedirect>
    );
};

export default Login;
