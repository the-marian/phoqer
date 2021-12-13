import React, { ReactElement } from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import PageLayout from '../../components/layout/page-layout';
import Meta from '../../components/meta';
import FavoriteContent from '../../components/pages/favorite';
import useTrans from '../../hooks/trans.hook';

const Favorite = (): ReactElement => {
    const trans = useTrans();

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={trans('favorite_offer')} h1={trans('favorite_offer')} />
                <PageLayout>
                    <FavoriteContent />
                </PageLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default Favorite;
