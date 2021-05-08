import React, { ReactElement } from 'react';

import ErrorComponent from '../../components/common/error';
import Container from '../../components/layout/container';
import PageLayout from '../../components/layout/page-layout';
import useTrans from '../../hooks/trans.hook';

const Page404 = (): ReactElement => {
    const trans = useTrans();

    return (
        <PageLayout>
            <Container>
                <ErrorComponent title="404" text={trans('404_page')} />
            </Container>
        </PageLayout>
    );
};

export default Page404;
