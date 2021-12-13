import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Breadcrumbs from '../../components/common/breadcrumbs';
import SegmentedControl from '../../components/common/segmented-control';
import Container from '../../components/layout/container';
import PageLayout from '../../components/layout/page-layout';
import Meta from '../../components/meta';
import MobileBackBtn from '../../components/pages/profile/mobile-back-btn';
import ProfileHeader from '../../components/pages/profile/profile-header';
import ProfileTabs from '../../components/pages/profile/profile-tabs';
import General from '../../components/pages/profile/settings/general';
import Privacy from '../../components/pages/profile/settings/privacy';
import useMedia from '../../hooks/media.hook';
import useTrans from '../../hooks/trans.hook';
import routes from '../../utils/routes';
import { Theme } from '../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(2, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            margin: '0',
        }),
    },
    title: {
        margin: theme.rem(4, 0),
        fontSize: theme.rem(3),
        fontWeight: theme.text.weight[3],
    },
    breadcrumbs: {
        margin: theme.rem(0, 0, 2),
    },
}));

const tabsConfig = [
    {
        id: 'general',
        text: 'general',
    },
    {
        id: 'privacy',
        text: 'privacy',
    },
];

const tabs: { [key: string]: ReactElement } = {
    general: <General />,
    privacy: <Privacy />,
};

const Settings = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const history = useRouter();
    const media = useMedia(1060);

    const activeTab = String(history.query.activeTab);
    const handleClick = (value: string): void => {
        history.push(routes.settings(value));
    };

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={trans('my_settings')} h1={trans('user_profile_on_phoqer')} />
                <PageLayout>
                    <Container>
                        <>
                            {media ? (
                                <>
                                    <ProfileHeader />
                                    <Breadcrumbs
                                        className={css.breadcrumbs}
                                        end={activeTab === 'general' ? trans('general') : trans('privacy')}
                                        data={[
                                            { label: trans('to_home_page'), link: routes.root },
                                            { label: trans('personal_area'), link: routes.profile.private },
                                        ]}
                                    />

                                    <ProfileTabs active="settings" />
                                </>
                            ) : (
                                <MobileBackBtn href={routes.profile.private}>Back to profile</MobileBackBtn>
                            )}

                            <SegmentedControl tabs={tabsConfig} active={activeTab} onClick={handleClick} />

                            <div className={css.root}>{tabs[activeTab] || tabs.general}</div>
                        </>
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default Settings;
