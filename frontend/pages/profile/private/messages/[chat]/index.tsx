import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, ReactElement } from 'react';

import { serverRedirect } from '../../../../../assets/helpers';
import Meta from '../../../../../components/Common/Meta';
import ProfileNav from '../../../../../components/Common/NavTabs/ProfileNav';
import AuthRedirect from '../../../../../components/HOC/Auth/AuthRedirect';
import Container from '../../../../../components/Layout/Container';
import ChatWrp from '../../../../../components/Pages/Profile/Private/Messages/ChatWrp';
import Main from '../../../../../components/Shared/TagMain';
import useTrans from '../../../../../hooks/trans.hook';
import { wrapper } from '../../../../../redux/store';

const Messages = (): ReactElement => {
    const T = useTrans();
    const history = useRouter();

    return (
        <>
            <Meta title={'Мои сообщения'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <Main>
                <Container>
                    <ProfileNav active="messages" />
                    <ChatWrp active={String(history.query.chat)}>
                        <p>Select the chat in side panel</p>
                    </ChatWrp>
                </Container>
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default Messages;
