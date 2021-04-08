import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import { serverRedirect } from '../../../assets/helpers';
import ForgotPassForm from '../../../components/Common/Auth/ForgotPassForm';
import AuthRedirect from '../../../components/Context/Auth/AuthRedirect';
import Meta from '../../../components/Layout/Meta';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';

const ForgotPass = (): ReactElement => {
    const T = useTrans();
    return (
        <>
            <AuthRedirect reverse />
            <Meta title={T.reset_password} h1={T.reset_password} />
            <AuthContainer>
                <ForgotPassForm />
            </AuthContainer>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    serverRedirect((ctx as unknown) as GetServerSidePropsContext, null, true);
});

export default ForgotPass;
