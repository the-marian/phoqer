import React, { useEffect } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useDispatch } from 'react-redux';
import { END } from 'redux-saga';

import { ParsedUrlQuery } from 'querystring';

import locales from '../../../assets/translations';
import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import SingleOfferContent from '../../../components/pages/offers/single-offer/single-offer-content';
import { IOfferCard, IOfferPagination, IStore } from '../../../interfaces';
import services from '../../../redux/offers/services';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';
import endpoint from '../../../utils/endpoint';
import api from '../../../utils/interceptors';

interface IProps {
    data: IOfferCard | null;
}

const SingleOfferPage = ({ data }: IProps): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: types.GET_POPULAR_OFFERS_SUCCESS, payload: data });
    }, [dispatch, data]);

    return (
        <GetStaticProfile>
            <PageLayout>
                <Container>
                    <SingleOfferContent data={data} />
                </Container>
            </PageLayout>
        </GetStaticProfile>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get<IOfferPagination>(endpoint('/offers/search'), {
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

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async ctx => {
    const offerId = ctx.params?.offerId;

    if (!offerId) {
        return {
            notFound: true,
        };
    }

    const { data, status } = await services.single(offerId as string);
    if (status < 200 || status >= 300) {
        return {
            notFound: true,
        };
    }

    store.dispatch({ type: types.GET_SINGLE_OFFER_SUCCESS, payload: data });
    store.dispatch(END);
    await (store as IStore).sagaTask?.toPromise();

    return { props: { data }, revalidate: 60 };
});

export default SingleOfferPage;
