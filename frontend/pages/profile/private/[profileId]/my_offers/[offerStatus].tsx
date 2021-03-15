import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { serverRedirect } from '../../../../../assets/helpers';
import { Theme } from '../../../../../assets/theme';
import Meta from '../../../../../components/Common/Meta';
import ProfileNav from '../../../../../components/Common/NavTabs/ProfileNav';
import ProfileOffersNav from '../../../../../components/Common/NavTabs/ProfileOffersNav';
import OffersList from '../../../../../components/Common/Offers/OffersList';
import Container from '../../../../../components/Layout/Container';
import Main from '../../../../../components/Layout/TagMain';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferStatic, IState } from '../../../../../interfaces';
import { wrapper } from '../../../../../redux/store';
import types from '../../../../../redux/types';

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

    const { data, loading } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    useEffect(() => {
        dispatch({ type: types.GET_POPULAR_OFFERS_START });
    }, [dispatch, offerStatus]);

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <Main>
                <Container>
                    <ProfileNav profileId={query.profileId} active="my_offers" />
                    <ProfileOffersNav profileId={query.profileId} active={offerStatus} />

                    <div className={css.root}>
                        <OffersList loading={loading} data={data} />
                    </div>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default UserOffers;
