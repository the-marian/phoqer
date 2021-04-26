import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';

import routes from '../../../assets/routes';
import Breadcrumbs from '../../../components/common/breadcrumbs';
import Container from '../../../components/layout/container';
import Meta from '../../../components/layout/meta';
import PageLayout from '../../../components/layout/page-layout';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

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

export const getServerSideProps = wrapper.getServerSideProps((ctx): void => {
    const locale = ((ctx as unknown) as GetServerSidePropsContext & { locale: string }).locale; // TEMP before release next-redux-wrapper https://github.com/kirill-konshin/next-redux-wrapper
    ctx.store.dispatch({ type: types.GET_TRANSLATIONS_START, payload: locale });
});

export default Rules;
