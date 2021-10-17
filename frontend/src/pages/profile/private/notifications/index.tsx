import React, { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import { createUseStyles } from 'react-jss';

import Breadcrumbs from '../../../../components/common/breadcrumbs';
import Construction from '../../../../components/common/notifications/construction';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import PageLayout from '../../../../components/layout/page-layout';
import Meta from '../../../../components/meta';
import Notifications from '../../../../components/pages/notifications';
import MobileBackBtn from '../../../../components/pages/profile/mobile-back-btn';
import ProfileHeader from '../../../../components/pages/profile/profile-header';
import ProfileTabs from '../../../../components/pages/profile/profile-tabs';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';
import { serverRedirect } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            margin: '0',
        }),
    },
    breadcrumbs: {
        margin: theme.rem(0, 0, 2),
    },
    wrp: {
        width: theme.rem(20),
    },
}));

const NotificationsPage = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);

    return (
        <>
            <AuthRedirect />
            <Meta title={trans('notifications')} h1={trans('user_profile_on_phoqer')} />
            <PageLayout>
                <Container>
                    <>
                        {media ? (
                            <>
                                <ProfileHeader />
                                <Breadcrumbs
                                    className={css.breadcrumbs}
                                    end={trans('notifications')}
                                    data={[
                                        { label: trans('to_home_page'), link: routes.root },
                                        { label: trans('personal_area'), link: routes.profile.private.personal_area },
                                    ]}
                                />

                                <ProfileTabs active="notifications" />
                            </>
                        ) : (
                            <MobileBackBtn href={routes.profile.private.personal_area}>Back to profile</MobileBackBtn>
                        )}

                        <div className={css.root}>
                            <Notifications />
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

export default NotificationsPage;
