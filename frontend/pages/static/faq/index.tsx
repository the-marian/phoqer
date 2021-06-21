import React, { ReactElement } from 'react';

import Breadcrumbs from '../../../components/common/breadcrumbs';
import Construction from '../../../components/common/construction';
import Container from '../../../components/layout/container';
import PageLayout from '../../../components/layout/page-layout';
import Meta from '../../../components/meta';
import routes from '../../../utils/routes';

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
                    <Construction />
                </Container>
            </PageLayout>
        </>
    );
};

export default FAQ;
