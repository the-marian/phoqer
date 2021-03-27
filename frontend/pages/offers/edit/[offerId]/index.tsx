import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import { serverRedirect } from '../../../../assets/helpers';
import Meta from '../../../../components/Common/Meta';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import Container from '../../../../components/Layout/Container';
import PageLayout from '../../../../components/Shared/PageLayout';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const EditPost = (): ReactElement => {
    const T = useTrans();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <PageLayout>
                <Container>
                    <p>Select the chat in side panel</p>
                </Container>
            </PageLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default EditPost;
