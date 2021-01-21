import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import Meta from '../../../components/Common/Meta';
import ProfileCard from '../../../components/Common/ProfileCard';
import Container from '../../../components/Layout/Container';
import Main from '../../../components/Layout/Main';
import ProfileInfo from '../../../components/Pages/Profile/Public/ProfileInfo';

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
    const history = useRouter();
    console.log(history.query.profileId);

    return (
        <>
            <Meta title={'Влад Василенко'} />
            <Main>
                <Container>
                    <div className={css.wrp}>
                        <div className={css.left}>
                            <ProfileCard firstName="Влад" lastName="Василенко" />
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

export default PublicProfilePage;
