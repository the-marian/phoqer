import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { findCategory, serverRedirect } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import Breadcrumbs from '../../../../components/common/breadcrumbs';
import DropDown from '../../../../components/common/drop-down';
import Pagination from '../../../../components/common/load-more/pagination';
import OffersList from '../../../../components/common/offers/offers-list';
import ProfileNav from '../../../../components/common/user-nav/profile/root-nav';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import Meta from '../../../../components/layout/meta';
import PageLayout from '../../../../components/layout/page-layout';
import MobileBackBtn from '../../../../components/pages/profile/private/mobile-back-btn';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IDropValue, IOfferDynamic, IState } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(4, 0, 0),
    },
    dropdown: {
        width: '100%',
        '& p': {
            background: theme.palette.gray[0],
        },
        ...theme.media(768).min({
            width: theme.rem(30),
        }),
    },
    title: {
        margin: theme.rem(3, 0, 1),
        fontSize: theme.rem(1.6),
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

const UserOffers = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);
    const dispatch = useDispatch();

    const offersTab: IDropValue[] = [
        {
            slug: 'all',
            name: trans('all_offers'),
            type: 'main',
        },
        {
            slug: 'draft',
            name: trans('draft'),
            type: 'main',
        },
        {
            slug: 'active',
            name: trans('active'),
            type: 'main',
        },
        {
            slug: 'in-rent',
            name: trans('in_rent'),
            type: 'main',
        },
        {
            slug: 'archive',
            name: trans('archive'),
            type: 'main',
        },
    ];

    const history = useRouter();
    const offerStatus = String(history.query.offerStatus || '');

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.my_offers);

    useEffect(() => {
        dispatch({
            type: types.MY_OFFERS_START,
            payload: { tab: offerStatus, params: { page: String(history.query.page || '1') } },
        });
    }, [offerStatus]);

    const handleTab = (value: IDropValue | null): void => {
        if (!value) return;
        history.push(routes.profile.private.my_offers(value.slug), undefined, { shallow: true });
    };

    const handleClick = (page: number): void => {
        dispatch({ type: types.MY_OFFERS_START, payload: { tab: offerStatus, params: { page } } });
    };
    const handleMore = (page: number): void => {
        dispatch({ type: types.MY_OFFERS_PAGINATION_START, payload: { tab: offerStatus, params: { page } } });
    };

    return (
        <>
            <Meta title={trans('my_offers')} h1={trans('user_profile_on_phoqer')} />
            <AuthRedirect />
            <PageLayout>
                <Container>
                    <>
                        {media ? (
                            <>
                                <Breadcrumbs
                                    className={css.breadcrumbs}
                                    end={trans('my_offers')}
                                    data={[
                                        { label: trans('to_home_page'), link: routes.root },
                                        { label: trans('personal_area'), link: routes.profile.private.personal_area },
                                    ]}
                                />
                                <ProfileNav active="my-offers" />
                            </>
                        ) : (
                            <MobileBackBtn href={routes.profile.private.personal_area}>Back to profile</MobileBackBtn>
                        )}

                        <h3 className={css.title}>{trans('select_offer_status')}</h3>
                        <DropDown
                            data={offersTab}
                            defaultValue={findCategory(offersTab, offerStatus)}
                            className={css.dropdown}
                            onChange={handleTab}
                        />
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
