import React from 'react';

import { GetStaticPaths } from 'next';
import { END } from 'redux-saga';

import { ParsedUrlQuery } from 'querystring';

import locales from '../../../assets/translations';
import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import PublicProfile from '../../../components/pages/profile/single-profile';
import { IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const PublicProfilePage = (): JSX.Element => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <PageLayout>
                    <Container>
                        <PublicProfile />
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // TODO write api request
    const data = [1, 2, 3];

    return {
        paths: data.reduce((acc, item) => {
            const lang = Object.keys(locales).map(locale => ({ params: { profileId: String(item) }, locale }));
            return [...acc, ...lang];
        }, [] as Array<string | { params: ParsedUrlQuery; locale?: string }>),
        fallback: true,
    };
};

export const getStaticProps = wrapper.getStaticProps(async (ctx): Promise<void> => {
    const profileId = ctx.params?.profileId;
    ctx.store.dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: profileId });
    ctx.store.dispatch(END);
    await (ctx.store as IStore).sagaTask?.toPromise();
});

export default PublicProfilePage;
