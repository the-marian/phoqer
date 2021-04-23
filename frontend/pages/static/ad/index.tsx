import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';

const Advertising = (): ReactElement => {
    return (
        <>
            <Meta title="Реклама на сайте" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Реклама на сайте" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
            </PageLayout>
        </>
    );
};

export default Advertising;
