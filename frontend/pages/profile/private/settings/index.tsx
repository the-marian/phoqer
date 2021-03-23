import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/Common/Meta';
import ProfileNav from '../../../../components/Common/NavTabs/ProfileNav';
import Container from '../../../../components/Layout/Container';
import Main from '../../../../components/Shared/TagMain';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
    },
}));

const Settings = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <Main>
                <Container>
                    <ProfileNav active="settings" />
                    <div className={css.root}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam dolorem dolores eaque et,
                        excepturi fugiat impedit incidunt magni maiores molestiae neque quasi quidem, soluta sunt vero. Sequi,
                        voluptatibus?
                    </div>
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
