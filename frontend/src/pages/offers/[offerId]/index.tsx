import React, { ReactElement } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { END } from 'redux-saga';

import { ParsedUrlQuery } from 'querystring';

import locales from '../../../assets/translations';
import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import SingleOfferContent from '../../../components/pages/offers/single-offer/single-offer-content';
import { IOfferPagination, IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';
import api from '../../../utils/interceptors';

const SingleOfferPage = (): ReactElement | null => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <PageLayout>
                    <Container>
                        <SingleOfferContent />
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get<IOfferPagination>('http://dev.phoqer.com/api/v2/offers/search', {
        params: { page: 1, limit: 1000 },
    });

    return {
        paths: data.data.reduce((acc, item) => {
            const lang = Object.keys(locales).map(locale => ({ params: { offerId: String(item.id) }, locale }));
            return [...acc, ...lang];
        }, [] as Array<string | { params: ParsedUrlQuery; locale?: string }>),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(async ctx => {
    const offerId = ctx.params?.offerId;

    ctx.store.dispatch({ type: types.GET_SINGLE_OFFER_START, payload: offerId });
    ctx.store.dispatch(END);

    await (ctx.store as IStore)?.sagaTask?.toPromise();
});

export default SingleOfferPage;
