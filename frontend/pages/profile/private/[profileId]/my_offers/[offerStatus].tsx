import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { serverRedirect } from '../../../../../assets/helpers';
import { Theme } from '../../../../../assets/theme';
import Meta from '../../../../../components/Common/Meta';
import ProfileNav from '../../../../../components/Common/NavTabs/ProfileNav';
import ProfileOffersNav from '../../../../../components/Common/NavTabs/ProfileOffersNav';
import OffersList from '../../../../../components/Common/Offers/OffersList';
import Container from '../../../../../components/Layout/Container';
import Main from '../../../../../components/Layout/TagMain';
import useTrans from '../../../../../hooks/trans.hook';
import { IOfferStatic, IState, IStore } from '../../../../../interfaces';
import { wrapper } from '../../../../../redux/store';
import types from '../../../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
    },
}));

const UserOffers = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <Main>
                <Container>
                    <ProfileNav />
                    <ProfileOffersNav />

                    <div className={css.root}>
                        <OffersList data={data} />
                    </div>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
        ctx?.store?.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        ctx?.store?.dispatch(END);
        await (ctx?.store as IStore)?.sagaTask?.toPromise();
    },
);

export default UserOffers;
