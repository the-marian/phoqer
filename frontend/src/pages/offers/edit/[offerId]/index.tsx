import React from 'react';

import AuthRedirect from '../../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../../../components/layout/container';
import PageLayout from '../../../../components/layout/page-layout';
import SingleOfferContent from '../../../../components/pages/offers/edit/edit-content';

const SingleOfferPage = (): JSX.Element => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <PageLayout>
                    <Container>
                        <SingleOfferContent />
                    </Container>
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default SingleOfferPage;
