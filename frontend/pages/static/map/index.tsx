import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';

const SiteMap = (): ReactElement => {
    return (
        <>
            <Meta title="Карта сайта" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Карта сайта" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
            </PageLayout>
        </>
    );
};

export default SiteMap;
