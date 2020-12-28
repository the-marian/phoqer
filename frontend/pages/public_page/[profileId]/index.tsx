import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

import Main from '../../../components/Layout/Main';
import User from '../../../components/Pages/PublicPage/User';
import UserInfo from '../../../components/Pages/PublicPage/UserInfo';

{
    /* TODO тут надо назвать PublicProfilePage. 
    Важно - у нас все компоненты страниц должны заканчиваться на слово Page */
}
const PublicUser = (): ReactElement => {
    const router = useRouter();
    console.log(router.query.profileId);
    return (
        <Main>
            {/* 
                TODO обернуть все в компонент Container '~/components/Layout/Container'
                он добавит отсутпы справи и слева, самому не надо их писать
            */}
            {/* TODO я бы назвал UserCard или ProfileCard так не понятно что за юзер */}
            <User />
            <UserInfo />
        </Main>
    );
};

export default PublicUser;
