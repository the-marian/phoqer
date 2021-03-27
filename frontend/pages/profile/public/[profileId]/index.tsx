import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/Common/Meta';
import ProfileCard from '../../../../components/Common/ProfileCard';
import Container from '../../../../components/Layout/Container';
import ProfileInfo from '../../../../components/Pages/Profile/Public/ProfileInfo';
import useTrans from '../../../../hooks/trans.hook';
import { IPublicProfile, IState, IStore } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';
import PageLayout from "../../../../components/Shared/PageLayout";

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',

        '@media (max-width: 850px)': {
            flexDirection: 'column',
        },
    },
    sticky: {
        position: 'sticky',
        top: theme.rem(8),
        left: 0,
    },
    left: {
        width: theme.rem(45),

        '@media (max-width: 850px)': {
            display: 'block',
            width: '100%',
            marginBottom: theme.rem(4),
        },
    },
    right: {
        width: 'calc(100% - 49rem)',

        '@media (max-width: 850px)': {
            width: '100%',
        },
    },
}));

const PublicProfilePage = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    return (
        <>
            <Meta title={profile?.first_name + ' ' + profile?.last_name} h1={T.user_profile_on_phoqer} />
            <PageLayout>
                <Container>
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
                            <ProfileInfo />
                        </div>
                    </div>
                </Container>
            </PageLayout>
        </>
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
