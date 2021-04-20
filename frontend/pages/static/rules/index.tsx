import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';

const Rules = (): ReactElement => {
    return (
        <>
            <Meta title="Условия использования" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Условия использования" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
            </PageLayout>
        </>
    );
};

export default Rules;
