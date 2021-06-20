import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import Breadcrumbs from '../../../../components/common/breadcrumbs';
import Construction from '../../../../components/common/construction';
import ProfileNav from '../../../../components/common/navigation/profile-nav/root-nav';
import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Container from '../../../../components/layout/container';
import PageLayout from '../../../../components/layout/page-layout';
import Meta from '../../../../components/meta';
import MobileBackBtn from '../../../../components/pages/profile/private/mobile-back-btn';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';
import { Theme } from '../../../../theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            margin: '0',
        }),
    },
    breadcrumbs: {
        margin: theme.rem(0, 0, 2),
    },
    wrp: {
        width: theme.rem(20),
    },
}));

const Reviews = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);

    return (
        <>
            <AuthRedirect />
            <Meta title={trans('reviews')} h1={trans('user_profile_on_phoqer')} />
            <PageLayout>
                <Container>
                    <>
                        {media ? (
                            <>
                                <Breadcrumbs
                                    className={css.breadcrumbs}
                                    end={trans('reviews')}
                                    data={[
                                        { label: trans('to_home_page'), link: routes.root },
                                        { label: trans('personal_area'), link: routes.profile.private.personal_area },
                                    ]}
                                />
                                <ProfileNav active="reviews" />
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

export default Reviews;
