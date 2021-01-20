import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import ProfileCard from '../../../components/Common/ProfileCard';
import Container from '../../../components/Layout/Container';
import Main from '../../../components/Layout/Main';
import ProfileInfo from '../../../components/Pages/Profile/Public/ProfileInfo';

const useStyles = createUseStyles(() => ({
    wrp: {
        display: 'flex',
        '@media (max-width: 550px)': {
            display: 'block',
        },
    },
}));

const PublicProfilePage = (): ReactElement => {
    const css = useStyles();
    const history = useRouter();
    console.log(history.query.profileId);
    return (
        <Main>
            <Container>
                <div className={css.wrp}>
                    <ProfileCard firstName="Влад" lastName="Василенко" />
                    <ProfileInfo />
                </div>
            </Container>
        </Main>
    );
};

export default PublicProfilePage;
