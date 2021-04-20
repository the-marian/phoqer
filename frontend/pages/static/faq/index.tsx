import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';

const FAQ = (): ReactElement => {
    return (
        <>
            <Meta title="FAQ. Часто задаваемые вопросы" />
            <PageLayout>
                <Container>
                    <Breadcrumbs
                        end="FAQ. Часто задаваемые вопросы"
                        data={[{ label: 'На главную страницу', link: routes.root }]}
                    />
                </Container>
            </PageLayout>
        </>
    );
};

export default FAQ;
