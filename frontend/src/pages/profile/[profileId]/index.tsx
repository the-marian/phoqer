import React from 'react';

import { END } from 'redux-saga';

import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import PublicProfile from '../../../components/pages/profile/single-profile';
import { IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const PublicProfilePage = (): JSX.Element => {
    return (
        <GetStaticProfile>
            <PageLayout>
                <Container>
                    <PublicProfile />
                </Container>
            </PageLayout>
        </GetStaticProfile>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const profileId = ctx.params?.profileId;
    if (+(profileId || 0)) {
        store.dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: profileId });
        store.dispatch(END);
    }

    await (store as IStore).sagaTask?.toPromise();

    return { props: {} };
});

export default PublicProfilePage;
