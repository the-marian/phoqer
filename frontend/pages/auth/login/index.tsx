import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import { serverRedirect } from '../../../assets/helpers';
import LoginForm from '../../../components/common/auth/login-form';
import AuthRedirect from '../../../components/context/auth/auth-redirect';
import Meta from '../../../components/layout/meta';
import AuthContainer from '../../../components/pages/auth/auth-container';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';

const Login = (): ReactElement => {
    const trans = useTrans();
    return (
        <>
            <AuthRedirect reverse />
            <Meta title={trans('login')} h1={trans('login')} />
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
