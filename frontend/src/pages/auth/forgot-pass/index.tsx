import React, { ReactElement } from 'react';

import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import ForgotPassForm from '../../../components/common/auth/forms/forgot-pass-form';
import Meta from '../../../components/meta';
import AuthContainer from '../../../components/pages/auth/auth-container';
import useTrans from '../../../hooks/trans.hook';

const ForgotPass = (): ReactElement => {
    const trans = useTrans();
    return (
        <AuthRedirect reverse>
            <Meta title={trans('reset_password')} h1={trans('reset_password')} />
            <AuthContainer>
                <ForgotPassForm />
            </AuthContainer>
        </AuthRedirect>
    );
};

export default ForgotPass;
