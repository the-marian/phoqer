import React from 'react';

import { createUseStyles } from 'react-jss';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Breadcrumbs from '../../components/common/breadcrumbs';
import Container from '../../components/layout/container';
import PageLayout from '../../components/layout/page-layout';
import Meta from '../../components/meta';
import UserOffersContent from '../../components/pages/my-offers';
import MobileBackBtn from '../../components/pages/profile/mobile-back-btn';
import ProfileHeader from '../../components/pages/profile/profile-header';
import ProfileTabs from '../../components/pages/profile/profile-tabs';
import useMedia from '../../hooks/media.hook';
import useTrans from '../../hooks/trans.hook';
import routes from '../../utils/routes';
import { Theme } from '../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    breadcrumbs: {
        margin: theme.rem(0, 0, 2),
    },
}));

const UserOffers = (): JSX.Element => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);

    return (
        <AuthRedirect>
            <GetStaticProfile>
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

                            <UserOffersContent />
                        </>
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default UserOffers;
