import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme } from '../../../assets/theme';
import Container from '../../../components/Layout/Container';

import Main from '../../../components/Layout/Main';
import ProfileCard from '../../../components/Common/Profile/Public/ProfileCard';
import ProfileInfo from '../../../components/Pages/Profile/Public/ProfileInfo';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: { 
        display: 'flex',
        '@media (max-width: 550px)': {
            display: 'block',
        },
    }

}));

const PublicProfilePage = (): ReactElement => {
    const css = useStyles()
    const router = useRouter();
    console.log(router.query.profileId);
    return (
        <Main>
            <Container>
                <div className={css.wrp}>
                    <ProfileCard />
                    <ProfileInfo />
                </div>
            </Container>
        </Main>
    );
};

export default PublicProfilePage;