import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import ForgotPassForm from '../../../components/common/auth-form/forgot-pass-form';
import AuthRedirect from '../../../components/context/auth/auth-redirect';
import Meta from '../../../components/meta';
import AuthContainer from '../../../components/per-pages/auth/auth-container';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';
import { serverRedirect } from '../../../utils/helpers';

const ForgotPass = (): ReactElement => {
    const trans = useTrans();
    return (
        <>
            <AuthRedirect reverse />
            <Meta title={trans('reset_password')} h1={trans('reset_password')} />
            <AuthContainer>
                <ForgotPassForm />
            </AuthContainer>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    serverRedirect(ctx as unknown as GetServerSidePropsContext, null, true);
});

export default ForgotPass;
