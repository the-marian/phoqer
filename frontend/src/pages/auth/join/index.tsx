import React, { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';

import JoinForm from '../../../components/common/auth-form/join-form';
import AuthRedirect from '../../../components/context/auth/auth-redirect';
import Meta from '../../../components/meta';
import AuthContainer from '../../../components/pages/auth/auth-container';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';
import { serverRedirect } from '../../../utils/helpers';

const Join = (): ReactElement => {
    const trans = useTrans();
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
    serverRedirect(ctx as unknown as GetServerSidePropsContext, null, true);
});

export default Join;
