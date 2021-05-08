import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/layout/meta';
import ProfileCard from '../../../../components/common/profile-card';
import Container from '../../../../components/layout/container';
import ProfileInfo from '../../../../components/pages/profile/public/profile-info';
import { IPublicProfile, IState, IStore } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';
import PageLayout from "../../../../components/layout/page-layout";
import useTrans from "../../../../hooks/trans.hook";
import ErrorComponent from "../../../../components/common/error";

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
}));

const PublicProfilePage = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    return (

            <PageLayout>
                <Container>
                    {profile ? <>
                        <Meta title={profile?.first_name + ' ' + profile?.last_name}
                              h1={trans('user_profile_on_phoqer')}/>
                        <div className={css.wrp}>
                            <div className={css.left}>
                                <ProfileCard
                                    className={css.sticky}
                                    id={profile?.id}
                                    registerDate={profile?.date_joined}
                                    firstName={profile?.first_name}
                                    lastName={profile?.last_name}
                                    avatar={profile?.profile_img}
                                    userLocation={profile?.location}
                                    lastActivity={profile?.last_activity}
                                />
                            </div>
                            <div className={css.right}>
                                <ProfileInfo/>
                            </div>
                        </div>
                    </> : <ErrorComponent title='404' text={trans('404_profile')} />}
                </Container>
            </PageLayout>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        ctx.store.dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: +(ctx.query?.profileId || 0) });
        ctx.store.dispatch(END);
        await (ctx.store as IStore).sagaTask?.toPromise();
    },
);

export default PublicProfilePage;
