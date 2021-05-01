import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import { Theme } from '../../../assets/theme';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';
import ProfileAside from '../../../components/pages/profile/private/personal_area/aside';
import Content from '../../../components/pages/profile/private/personal_area/content';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import { wrapper } from '../../../redux/store';

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

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        if (serverRedirect((ctx as unknown) as GetServerSidePropsContext)) return;
    },
);

export default Private;
