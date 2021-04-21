import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import ProfileNav from '../../../../components/common/user-nav/profile/root-nav';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import Meta from '../../../../components/layout/meta';
import PageLayout from '../../../../components/layout/page-layout';
import General from '../../../../components/pages/profile/private/settings/general';
import Privacy from '../../../../components/pages/profile/private/settings/privacy';
import SettingsNav from '../../../../components/pages/profile/private/settings/settings-nav';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

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
}));

const tabs: { [key: string]: ReactElement } = {
    general: <General />,
    privacy: <Privacy />,
};

const Settings = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const { query } = useRouter();
    const media = useMedia(1060);

    return (
        <>
            <Meta title={'Мои обьявления'} h1={trans('user_profile_on_phoqer')} />
            <AuthRedirect />
            <PageLayout>
                <Container>
                    <>
                        {media && <ProfileNav active="settings" />}
                        <SettingsNav />
                        <div className={css.root}>{tabs[String(query.activeTab)] || tabs.general}</div>
                    </>
                </Container>
            </PageLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        if (serverRedirect((ctx as unknown) as GetServerSidePropsContext)) return;
    },
);

export default Settings;