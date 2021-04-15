import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import trans from '../../../../assets/trans';
import Container from '../../../../components/common/container';
import ProfileNav from '../../../../components/common/nav-tabs/profile/root-nav';
import ProfileSettingsNav from '../../../../components/common/nav-tabs/profile/settings-nav';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Meta from '../../../../components/layout/meta';
import PageLayout from '../../../../components/layout/page-layout';
import General from '../../../../components/pages/profile/private/settings/general';
import Privacy from '../../../../components/pages/profile/private/settings/privacy';
import { wrapper } from '../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(2, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
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
    const { query } = useRouter();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={trans('user_profile_on_phoqer')} />
            <AuthRedirect />
            <PageLayout>
                <Container>
                    <ProfileNav active="settings" />
                    <ProfileSettingsNav active={String(query.activeTab)} />

                    <div className={css.root}>{tabs[String(query.activeTab)] || tabs.general}</div>
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
