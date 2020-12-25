import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Main from '../../../components/Layout/Main';
import User from '../../../components/Pages/PublicPage/User';
import UserInfo from '../../../components/Pages/PublicPage/UserInfo';


const UserPublicPage = (): ReactElement => {
    const router = useRouter();

    console.log(router.query.profileId);
    return (
        <Main>
            <User />
            <UserInfo />
        </Main>
    )
};


export default UserPublicPage;