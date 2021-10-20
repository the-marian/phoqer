import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import AdSense from '../../../components/common/ads';
import ErrorComponent from '../../../components/common/error-template';
import Pagination from '../../../components/common/load-more/pagination';
import OffersList from '../../../components/common/offers/offers-list';
import ProfileCard from '../../../components/common/profile-card';
import SectionTitle from '../../../components/common/section-title';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import Meta from '../../../components/meta';
import ProfileInfo from '../../../components/pages/profile/profile-info';
import useTrans from '../../../hooks/trans.hook';
import { IOfferDynamic, IPublicProfile, IState, IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';
import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',

        ...theme.media(1300).max({
            flexDirection: 'column',
        }),
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(8),
        left: 0,
    },
    left: {
        width: theme.rem(45),

        ...theme.media(1300).max({
            display: 'block',
            width: '100%',
            marginBottom: theme.rem(4),
        }),
    },
    right: {
        width: 'calc(100% - 49rem)',

        ...theme.media(1300).max({
            width: '100%',
        }),
    },
    container: {
        marginTop: theme.rem(6),
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.rem(4, 0),
    },
}));

const PublicProfilePage = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);
    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.my_offers);

    const handleClick = (page: number): void => {
        window.scrollTo({ top: (document?.getElementById('offers-list')?.offsetTop || 0) - 50, behavior: 'smooth' });
        dispatch({ type: types.PUBLIC_OFFERS_START, payload: profile?.id, params: { page } });
    };
    const handleMore = (page: number): void => {
        const top =
            (document?.getElementById('offers-list')?.offsetTop || 0) +
            (document?.getElementById('offers-list')?.offsetHeight || 0) -
            500;
        dispatch({ type: types.PUBLIC_OFFERS_PAGINATION_START, payload: profile?.id, params: { page } });
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <PageLayout>
            <Container>
                {profile ? (
                    <>
                        <Meta h1={trans('user_profile_on_phoqer')} title={profile?.first_name + ' ' + profile?.last_name} />
                        <div className={css.wrp}>
                            <div className={css.left}>
                                <ProfileCard
                                    className={css.sticky}
                                    id={profile?.id}
                                    registerDate={profile?.date_joined}
                                    firstName={profile?.first_name}
                                    lastName={profile?.last_name}
                                    avatar={profile?.profile_img}
                                    userLocation={profile?.city}
                                    lastActivity={profile?.last_activity}
                                />
                            </div>
                            <div className={css.right}>
                                <ProfileInfo />
                            </div>
                        </div>
                        <div id="offers-list" className={css.container}>
                            <SectionTitle>{trans('Активные объявления')}</SectionTitle>
                            <OffersList
                                loading={pagination}
                                loadMoreLoading={loading}
                                showFavoriteBtn={user?.id !== profile?.id}
                                data={data?.data}
                            />
                            <Pagination loading={pagination} total={data.total} onClick={handleClick} onMore={handleMore} />
                        </div>

                        <AdSense type="horizontal" className={css.box} />
                    </>
                ) : (
                    <ErrorComponent title="404" text={trans('404_profile')} />
                )}
            </Container>
        </PageLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    ctx.store.dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: ctx.query?.profileId || '' });
    ctx.store.dispatch({
        type: types.PUBLIC_OFFERS_START,
        payload: ctx.query?.profileId || '',
        params: { page: ctx.query?.page || '1' },
    });
    ctx.store.dispatch(END);
    await (ctx.store as IStore).sagaTask?.toPromise();
});

export default PublicProfilePage;
