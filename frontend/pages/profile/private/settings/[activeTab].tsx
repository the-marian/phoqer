import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Container from '../../../../components/Common/Container';
import ProfileNav from '../../../../components/Common/NavTabs/Profile/RootNav';
import ProfileSettingsNav from '../../../../components/Common/NavTabs/Profile/SettingsNav';
import AuthRedirect from '../../../../components/Context/Auth/AuthRedirect';
import Meta from '../../../../components/Layout/Meta';
import PageLayout from '../../../../components/Layout/PageLayout';
import General from '../../../../components/Pages/Profile/Private/Settings/General';
import Privacy from '../../../../components/Pages/Profile/Private/Settings/Privacy';
import useTrans from '../../../../hooks/trans.hook';
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
    const T = useTrans();
    const css = useStyles();
    const { query } = useRouter();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
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
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default Settings;
