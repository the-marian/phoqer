import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/Common/Meta';
import ProfileNav from '../../../../components/Common/NavTabs/ProfileNav';
import ProfileSettings from '../../../../components/Common/NavTabs/ProfileSettings';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import Container from '../../../../components/Layout/Container';
import General from '../../../../components/Pages/Profile/Private/Settings/General';
import Privacy from '../../../../components/Pages/Profile/Private/Settings/Privacy';
import Main from '../../../../components/Shared/TagMain';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(2, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
}));

interface ITabs {
    [key: string]: ReactElement;
}

const Tabs: ITabs = {
    general: <General />,
    privacy: <Privacy />,
};

const Settings = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const history = useRouter();
    const tab = String(history.query.tab);

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <Main>
                <Container>
                    <ProfileNav active="settings" />
                    <ProfileSettings active={tab} />

                    <div className={css.root}>{Tabs[tab] || Tabs.general}</div>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default Settings;
