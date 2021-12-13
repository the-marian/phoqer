import React, { ReactElement, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../../hooks/trans.hook';
import { IOfferDynamic, IPublicProfile, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import { Theme } from '../../../../utils/theming/theme';
import ErrorComponent from '../../../common/error-template';
import Pagination from '../../../common/load-more/pagination';
import OffersList from '../../../common/offers/offers-list';
import ProfileCard from '../../../common/profile-card';
import SectionTitle from '../../../common/section-title';
import Meta from '../../../meta';
import ProfileInfo from '../profile-info';

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
}));

const PublicProfile = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const history = useRouter();
    const profileId = +String(history.query.profileId);

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);
    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.my_offers);

    useEffect(() => {
        dispatch({
            type: types.PUBLIC_OFFERS_START,
            payload: profileId,
            params: { page: 1 },
        });
    }, [dispatch, profileId]);

    const handleClick = useCallback(
        (page: number): void => {
            window.scrollTo({ top: (document?.getElementById('offers-list')?.offsetTop || 0) - 50, behavior: 'smooth' });
            dispatch({ type: types.PUBLIC_OFFERS_START, payload: profile?.id, params: { page } });
        },
        [dispatch, profile?.id],
    );
    const handleMore = useCallback(
        (page: number): void => {
            const top =
                (document?.getElementById('offers-list')?.offsetTop || 0) +
                (document?.getElementById('offers-list')?.offsetHeight || 0) -
                500;
            dispatch({ type: types.PUBLIC_OFFERS_PAGINATION_START, payload: profile?.id, params: { page } });
            window.scrollTo({ top, behavior: 'smooth' });
        },
        [dispatch, profile?.id],
    );

    return (
        <>
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
                </>
            ) : (
                <ErrorComponent title="404" text={trans('404_profile')} />
            )}
        </>
    );
};

export default PublicProfile;
