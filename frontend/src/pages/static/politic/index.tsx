import React, { ReactElement } from 'react';

import Breadcrumbs from '../../../components/common/breadcrumbs';
import Construction from '../../../components/common/notifications/construction';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import Meta from '../../../components/meta';
import routes from '../../../utils/routes';

const Politic = (): ReactElement => {
    return (
        <>
            <Meta title="Политика конфиденциальности" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Политика конфиденциальности" data={[{ label: 'На главную страницу', link: routes.root }]} />
                    <Construction />
                </Container>
            </PageLayout>
        </>
    );
};

export default Politic;
