import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';

const Safety = (): ReactElement => {
    return (
        <>
            <Meta title="Правила безопасности" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Правила безопасности" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
            </PageLayout>
        </>
    );
};

export default Safety;
