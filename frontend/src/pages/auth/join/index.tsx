import React, { ReactElement } from 'react';

import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import JoinForm from '../../../components/common/auth/forms/join-form';
import Meta from '../../../components/meta';
import AuthContainer from '../../../components/pages/auth/auth-container';
import useTrans from '../../../hooks/trans.hook';

const Join = (): ReactElement => {
    const trans = useTrans();
    return (
        <AuthRedirect reverse>
            <Meta title={trans('join')} />
            <AuthContainer>
                <JoinForm />
            </AuthContainer>
        </AuthRedirect>
    );
};

export default Join;
