import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Container from '../../../../components/Common/Container';
import Pagination from '../../../../components/Common/LoadMore/Pagination';
import ProfileOffersNav from '../../../../components/Common/NavTabs/Profile/OffersNav';
import ProfileNav from '../../../../components/Common/NavTabs/Profile/RootNav';
import OffersList from '../../../../components/Common/Offers/OffersList';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import Meta from '../../../../components/Shared/Meta';
import PageLayout from '../../../../components/Shared/PageLayout';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferDynamic, IState } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(8, 0, 0),
    },
}));

const UserOffers = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const dispatch = useDispatch();

    const { query } = useRouter();
    const offerStatus = String(query.offerStatus);

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.my_offers);

    useEffect(() => {
        dispatch({
            type: types.MY_OFFERS_START,
            payload: { tab: offerStatus, params: { page: String(query.page || '1') } },
        });
    }, [offerStatus]);

    const handleClick = (page: number): void => {
        dispatch({ type: types.MY_OFFERS_START, payload: { tab: offerStatus, params: { page } } });
    };
    const handleMore = (page: number): void => {
        dispatch({ type: types.MY_OFFERS_PAGINATION_START, payload: { tab: offerStatus, params: { page } } });
    };

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <PageLayout>
                <Container>
                    <ProfileNav active="my-offers" />
                    <ProfileOffersNav active={offerStatus} />

                    <div className={css.root}>
                        <OffersList loading={loading} data={data?.data} />
                        <Pagination loading={pagination} total={data.total} onClick={handleClick} onMore={handleMore} />
                    </div>
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

export default UserOffers;
