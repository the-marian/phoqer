import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import Breadcrumbs from '../../../components/common/breadcrumbs';
import AuthRedirect from '../../../components/context/auth/auth-redirect';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import Meta from '../../../components/meta';
import ProfileAside from '../../../components/per-pages/personal-area/aside';
import Content from '../../../components/per-pages/personal-area/content';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';
import { serverRedirect } from '../../../utils/helpers';
import routes from '../../../utils/routes';
import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    content: {
        width: 'calc(100% - 31rem)',
        ...theme.media(1060).max({
            width: '100%',
        }),
    },
    aside: {
        position: 'relative',
        width: theme.rem(30),
        ...theme.media(1060).max({
            width: '100%',
        }),
    },
    breadcrumbs: {
        margin: theme.rem(0, 0, 4),
    },
}));

const Private = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);

    return (
        <>
            <AuthRedirect />
            <Meta title={trans('personal_area')} h1={trans('user_profile_on_phoqer')} />
            <PageLayout>
                <Container>
                    <>
                        {media ? (
                            <Breadcrumbs
                                className={css.breadcrumbs}
                                end={trans('personal_area')}
                                data={[{ label: trans('to_home_page'), link: routes.root }]}
                            />
                        ) : null}
                        <div className={css.flex}>
                            <aside className={css.aside}>
                                <ProfileAside />
                            </aside>
                            <div className={css.content}>
                                <Content />
                            </div>
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

export default Private;
