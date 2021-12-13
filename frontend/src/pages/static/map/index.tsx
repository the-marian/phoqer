import React, { ReactElement } from 'react';

import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Construction from '../../../components/common/notifications/construction';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import Meta from '../../../components/meta';
import routes from '../../../utils/routes';

const SiteMap = (): ReactElement => {
    return (
        <GetStaticProfile>
            <Meta title="Карта сайта" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Карта сайта" data={[{ label: 'На главную страницу', link: routes.root }]} />
                    <Construction />
                </Container>
            </PageLayout>
        </GetStaticProfile>
    );
};

export default SiteMap;
