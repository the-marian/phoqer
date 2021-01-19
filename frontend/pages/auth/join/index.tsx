import React, { ReactElement } from 'react';

import JoinForm from '../../../components/Common/Auth/JoinForm';
import Meta from '../../../components/Common/Meta';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import serverRedirect from '../../../components/HOC/ServerRedirect';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';
import { wrapper } from '../../../redux/store';

const Login = (): ReactElement => (
    <>
        <AuthRedirect reverse />
        <Meta title="Join | Phoqer" />
        <AuthContainer>
            <JoinForm />
        </AuthContainer>
    </>
);

export const getServerSideProps = wrapper.getServerSideProps(serverRedirect(null, null, true));

export default Login;
