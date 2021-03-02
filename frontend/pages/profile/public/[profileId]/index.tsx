import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { END } from 'redux-saga';

import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/Common/Meta';
import ProfileCard from '../../../../components/Common/ProfileCard';
import Container from '../../../../components/Layout/Container';
import Main from '../../../../components/Layout/Main';
import ProfileInfo from '../../../../components/Pages/Profile/Public/ProfileInfo';
import useTrans from '../../../../hooks/trans.hook';
import { IStore } from '../../../../interfaces';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',

        '@media (max-width: 850px)': {
            flexDirection: 'column',
        },
    },
    left: {
        width: theme.rem(40),

        '@media (max-width: 850px)': {
            display: 'block',
            width: '100%',
            marginBottom: theme.rem(4),
        },
    },
    right: {
        width: 'calc(100% - 45rem)',

        '@media (max-width: 850px)': {
            width: '100%',
        },
    },
}));

const PublicProfilePage = (): ReactElement => {
    const css = useStyles();
    const T = useTrans();

    return (
        <>
            <Meta title={'Влад Василенко'} h1={T.user_profile_on_phoqer} />
            <Main>
                <Container>
                    <div className={css.wrp}>
                        <div className={css.left}>
                            <ProfileCard id={1} firstName="Влад" lastName="Василенко" />
                        </div>
                        <div className={css.right}>
                            <ProfileInfo />
                        </div>
                    </div>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        ctx.store.dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: +ctx.query?.profileId });
        ctx.store.dispatch(END);
        await (ctx.store as IStore).sagaTask?.toPromise();
    },
);

export default PublicProfilePage;
