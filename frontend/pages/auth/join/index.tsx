import React, { ReactElement } from 'react';

import JoinForm from '../../../components/Common/Auth/JoinForm';
import Meta from '../../../components/Common/Meta';
import AuthRedirect from '../../../components/HOC/Auth/AuthRedirect';
import serverRedirect from '../../../components/HOC/ServerRedirect';
import AuthContainer from '../../../components/Pages/Auth/AuthContainer';
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

export const getInitialProps = wrapper.getServerSideProps(serverRedirect(null, null, true));

export default Join;
