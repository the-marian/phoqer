import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import Breadcrumbs from '../../../../components/common/breadcrumbs';
import ProfileNav from '../../../../components/common/user-nav/profile/root-nav';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import Meta from '../../../../components/layout/meta';
import PageLayout from '../../../../components/layout/page-layout';
import MobileBackBtn from '../../../../components/pages/profile/private/mobile-back-btn';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

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
            <Meta title={trans('analytics')} h1={trans('user_profile_on_phoqer')} />
            <AuthRedirect />
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
                                <ProfileNav active="analytics" />
                            </>
                        ) : (
                            <MobileBackBtn href={routes.profile.private.personal_area}>Back to profile</MobileBackBtn>
                        )}
                        <div className={css.root}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam dolorem dolores eaque
                            et, excepturi fugiat impedit incidunt magni maiores molestiae neque quasi quidem, soluta sunt vero.
                            Sequi, voluptatibus?
                        </div>
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

export default Analytics;
