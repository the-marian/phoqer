import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import Breadcrumbs from '../../../../components/common/breadcrumbs';
import Construction from '../../../../components/common/notifications/construction';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import PageLayout from '../../../../components/layout/page-layout';
import Meta from '../../../../components/meta';
import MobileBackBtn from '../../../../components/per-pages/profile/mobile-back-btn';
import ProfileTabs from '../../../../components/per-pages/profile/profile-tabs';
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
        <>
            <AuthRedirect />
            <Meta title={trans('analytics')} h1={trans('user_profile_on_phoqer')} />

            <PageLayout>
                <Container>
                    <>
                        {media ? (
                            <>
                                <Breadcrumbs
                                    className={css.breadcrumbs}
                                    end={trans('analytics')}
                                    data={[
                                        { label: trans('to_home_page'), link: routes.root },
                                        { label: trans('personal_area'), link: routes.profile.private.personal_area },
                                    ]}
                                />

                                <ProfileTabs active="analytics" />
                            </>
                        ) : (
                            <MobileBackBtn href={routes.profile.private.personal_area}>Back to profile</MobileBackBtn>
                        )}
                        <div className={css.root}>
                            <Construction />
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

export default Analytics;
