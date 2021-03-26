import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import { serverRedirect } from '../../../assets/helpers';
import JoinForm from '../../../components/Common/Auth/JoinForm';
import AuthContainer from '../../../components/Common/AuthContainer';
import Meta from '../../../components/Common/Meta';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';

const Join = (): ReactElement => {
    const T = useTrans();
    return (
        <>
            <AuthRedirect reverse />
            <Meta title={T.join} />
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
