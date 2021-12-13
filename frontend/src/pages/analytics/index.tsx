import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Breadcrumbs from '../../components/common/breadcrumbs';
import Construction from '../../components/common/notifications/construction';
import Container from '../../components/layout/container';
import PageLayout from '../../components/layout/page-layout';
import Meta from '../../components/meta';
import MobileBackBtn from '../../components/pages/profile/mobile-back-btn';
import ProfileHeader from '../../components/pages/profile/profile-header';
import ProfileTabs from '../../components/pages/profile/profile-tabs';
import useMedia from '../../hooks/media.hook';
import useTrans from '../../hooks/trans.hook';
import routes from '../../utils/routes';
import { Theme } from '../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
    breadcrumbs: {
        margin: theme.rem(0, 0, 2),
    },
}));

const Analytics = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={trans('analytics')} h1={trans('user_profile_on_phoqer')} />

                <PageLayout>
                    <Container>
                        <>
                            {media ? (
                                <>
                                    <ProfileHeader />
                                    <Breadcrumbs
                                        className={css.breadcrumbs}
                                        end={trans('analytics')}
                                        data={[
                                            { label: trans('to_home_page'), link: routes.root },
                                            { label: trans('personal_area'), link: routes.profile.private },
                                        ]}
                                    />

                                    <ProfileTabs active="analytics" />
                                </>
                            ) : (
                                <MobileBackBtn href={routes.profile.private}>Back to profile</MobileBackBtn>
                            )}
                            <div className={css.root}>
                                <Construction />
                            </div>
                        </>
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default Analytics;
