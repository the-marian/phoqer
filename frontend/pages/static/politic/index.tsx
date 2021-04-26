import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';

const Politic = (): ReactElement => {
    return (
        <>
            <Meta title="Политика конфиденциальности" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Политика конфиденциальности" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
            </PageLayout>
        </>
    );
};

export default Politic;
