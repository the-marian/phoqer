import React, { ReactElement } from 'react';

import ForgotPassForm from '../../../components/Common/Auth/ForgotPassForm';
import Meta from '../../../components/Common/Meta';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import serverRedirect from '../../../components/HOC/ServerRedirect';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';
import { wrapper } from '../../../redux/store';

const ForgotPass = (): ReactElement => (
    <>
        <AuthRedirect reverse />
        <Meta title="Reset password" />
        <AuthContainer>
            <ForgotPassForm />
        </AuthContainer>
    </>
);

export const getInitialProps = wrapper.getServerSideProps(serverRedirect(null, null, true));

export default ForgotPass;
