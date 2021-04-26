import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import ProfileNav from '../../../../components/common/user-nav/profile/root-nav';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import Meta from '../../../../components/layout/meta';
import PageLayout from '../../../../components/layout/page-layout';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
}));

const Analytics = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <>
            <Meta title={'Мои обьявления'} h1={trans('user_profile_on_phoqer')} />
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
        if (serverRedirect((ctx as unknown) as GetServerSidePropsContext)) return;

        const locale = ((ctx as unknown) as GetServerSidePropsContext & { locale: string }).locale; // TEMP before release next-redux-wrapper https://github.com/kirill-konshin/next-redux-wrapper
        ctx.store.dispatch({ type: types.GET_TRANSLATIONS_START, payload: locale });
    },
);

export default Analytics;
