import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import { serverRedirect } from '../../../assets/helpers';
import trans from '../../../assets/trans';
import JoinForm from '../../../components/common/auth/join-form';
import AuthRedirect from '../../../components/context/auth/auth-redirect';
import Meta from '../../../components/layout/meta';
import AuthContainer from '../../../components/pages/auth/auth-container';
import { wrapper } from '../../../redux/store';

const Join = (): ReactElement => {
    return (
        <>
            <AuthRedirect reverse />
            <Meta title={trans('join')} />
            <AuthContainer>
                <JoinForm />
            </AuthContainer>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    serverRedirect((ctx as unknown) as GetServerSidePropsContext, null, true);
});

export default Join;
