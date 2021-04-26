import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const Help = (): ReactElement => {
    return (
        <>
            <Meta title="Помощь и Обратная связь" />
            <PageLayout>
                <Container>
                    <Breadcrumbs end="Помощь и Обратная связь" data={[{ label: 'На главную страницу', link: routes.root }]} />
                </Container>
            </PageLayout>
        </>
    );
};

export default Help;
