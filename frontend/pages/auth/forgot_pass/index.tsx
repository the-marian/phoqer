import React, { ReactElement } from 'react';

import ForgotPassForm from '../../../components/Common/Auth/ForgotPassForm';
import Meta from '../../../components/Common/Meta';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';

const ForgotPass = (): ReactElement => (
    <>
        <Meta title="Reset password | Phoqer" />
        <AuthContainer>
            <ForgotPassForm />
        </AuthContainer>
    </>
);

export default ForgotPass;
