import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Container from '../../../../components/Common/Container';
import ProfileNav from '../../../../components/Common/NavTabs/ProfileNav';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import Meta from '../../../../components/Shared/Meta';
import PageLayout from '../../../../components/Shared/PageLayout';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
}));

const Analytics = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <PageLayout>
                <Container>
                    <ProfileNav active="analytics" />
                    <div className={css.root}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam dolorem dolores eaque et,
                        excepturi fugiat impedit incidunt magni maiores molestiae neque quasi quidem, soluta sunt vero. Sequi,
                        voluptatibus?
                    </div>
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

export default Analytics;
