import React, { ReactElement, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/common/breadcrumbs';
import Pagination from '../../components/common/load-more/pagination';
import OffersList from '../../components/common/offers/offers-list';
import SegmentedControl from '../../components/common/segmented-control';
import AuthRedirect from '../../components/context/auth/auth-redirect';
import Container from '../../components/layout/container';
import PageLayout from '../../components/layout/page-layout';
import Meta from '../../components/meta';
import MobileBackBtn from '../../components/pages/profile/mobile-back-btn';
import ProfileHeader from '../../components/pages/profile/profile-header';
import ProfileTabs from '../../components/pages/profile/profile-tabs';
import useMedia from '../../hooks/media.hook';
import useTrans from '../../hooks/trans.hook';
import { IOfferDynamic, IState } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';
import { serverRedirect } from '../../utils/helpers';
import routes from '../../utils/routes';
import { Theme } from '../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0, 0),
    },
    title: {
        margin: theme.rem(3, 0, 1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            margin: theme.rem(0, 0, 1),
        }),
    },
    breadcrumbs: {
        margin: theme.rem(0, 0, 2),
    },
}));

const offersTab = [
    {
        id: 'all',
        text: 'all',
    },
    {
        id: 'draft',
        text: 'draft',
    },
    {
        id: 'active',
        text: 'active',
    },
    {
        id: 'in-rent',
        text: 'in_rent',
    },
    {
        id: 'archive',
        text: 'archive',
    },
];

const UserOffers = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);
    const dispatch = useDispatch();
    const history = useRouter();

    const offerStatus = String(history.query.offerStatus || '');

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.my_offers);

    useEffect(() => {
        dispatch({
            type: types.MY_OFFERS_START,
            payload: { tab: offerStatus, params: { page: String(history.query.page || '1') } },
        });
    }, [offerStatus, dispatch, history.query.page]);

    const handleClick = (page: number): void => {
        dispatch({ type: types.MY_OFFERS_START, payload: { tab: offerStatus, params: { page } } });
    };
    const handleMore = (page: number): void => {
        dispatch({ type: types.MY_OFFERS_PAGINATION_START, payload: { tab: offerStatus, params: { page } } });
    };

    const handleTab = (value: string): void => {
        history.push(routes.my_offers(value));
    };

    return (
        <>
            <AuthRedirect />
            <Meta title={trans('my_offers')} h1={trans('user_profile_on_phoqer')} />
            <PageLayout>
                <Container>
                    <>
                        <ProfileHeader />
                        {media ? (
                            <>
                                <Breadcrumbs
                                    className={css.breadcrumbs}
                                    end={trans('my_offers')}
                                    data={[
                                        { label: trans('to_home_page'), link: routes.root },
                                        { label: trans('personal_area'), link: routes.profile.private },
                                    ]}
                                />

                                <ProfileTabs active="my-offers" />
                            </>
                        ) : (
                            <MobileBackBtn href={routes.profile.private}>Back to profile</MobileBackBtn>
                        )}

                        <h3 className={css.title}>{trans('select_offer_status')}</h3>

                        <SegmentedControl tabs={offersTab} active={offerStatus} onClick={handleTab} />
                        <div className={css.root}>
                            <OffersList loading={loading} data={data?.data} showFavoriteBtn={false} />
                            <Pagination loading={pagination} total={data.total} onClick={handleClick} onMore={handleMore} />
                        </div>
                    </>
                </Container>
            </PageLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    if (serverRedirect(ctx as unknown as GetServerSidePropsContext)) return;
});

export default UserOffers;
