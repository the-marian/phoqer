import { GetServerSidePropsContext } from 'next';
import React, { Fragment, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Gift from '../../../../components/Common/Gift';
import Meta from '../../../../components/Common/Meta';
import ProfileNav from '../../../../components/Common/NavTabs/ProfileNav';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import Container from '../../../../components/Layout/Container';
import ChatElement from '../../../../components/Pages/Profile/Private/Messages/ChatElement';
import EmptyChat from '../../../../components/Pages/Profile/Private/Messages/EmptyChat';
import SearchChat from '../../../../components/Pages/Profile/Private/Messages/SearchChat';
import Main from '../../../../components/Shared/TagMain';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const test = [
    {
        id: 1,
        cover_image: null,
        first_name: 'Ihor',
        last_name: 'Mykhailychenko',
        date: '2021-03-25 20:29',
        preview: 'Alias aliquid aperiam dolorem dolores eaque et, quidem, soluta sunt vero. Sequi, voluptatibus?',
    },
    {
        id: 2,
        cover_image: '/about.jpg',
        first_name: 'Ihor',
        last_name: 'Mykhailychenko',
        date: '2021-05-25 15:32',
        preview: 'Alias aliquid aperiam dolorem dolores eaque et, quidem, soluta sunt vero. Sequi, voluptatibus?',
    },
    {
        id: 3,
        cover_image: '/login.jpg',
        first_name: 'Ihor',
        last_name: 'Mykhailychenko',
        date: '2021-05-25 15:32',
        preview: 'Alias aliquid aperiam dolorem dolores eaque et, quidem, soluta sunt vero. Sequi, voluptatibus?',
    },
    {
        id: 4,
        cover_image: '/join.jpg',
        first_name: 'Ihor',
        last_name: 'Mykhailychenko',
        date: '2021-03-25 15:32',
        preview: 'Alias aliquid aperiam dolorem dolores eaque et, quidem, soluta sunt vero. Sequi, voluptatibus?',
    },
    {
        id: 5,
        cover_image: null,
        first_name: 'Ihor',
        last_name: 'Mykhailychenko',
        date: '2021-03-25 15:32',
        preview: 'Alias aliquid aperiam dolorem dolores eaque et, quidem, soluta sunt vero. Sequi, voluptatibus?',
    },
    {
        id: 6,
        cover_image: '/forgot_pass.jpg',
        first_name: 'Ihor',
        last_name: 'Mykhailychenko',
        date: '2021-03-25 15:32',
        preview: 'Alias aliquid aperiam dolorem dolores eaque et, quidem, soluta sunt vero. Sequi, voluptatibus?',
    },
];

const test2 = [];

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.rem(6, 0, 2),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],
    },
    aside: {
        maxHeight: '75vh',
        minWidth: theme.rem(40),
        maxWidth: theme.rem(40),
        paddingRight: theme.rem(0.5),
        overflow: 'auto',
    },
    chat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginLeft: theme.rem(1),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
    },
    end: {
        margin: theme.rem(2, 0, 4),
        textAlign: 'center',
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.4),
    },
}));

const Messages = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();

    return (
        <>
            <Meta title={'Мои сообщения'} h1={T.user_profile_on_phoqer} />
            <AuthRedirect />
            <Main>
                <Container>
                    <ProfileNav active="messages" />
                    <div className={css.root}>
                        <aside className={css.aside}>
                            <SearchChat />
                            {test?.length ? (
                                test.map((item, index) =>
                                    index === 3 ? (
                                        <Fragment key={item.id}>
                                            <Gift />
                                            <ChatElement
                                                id={item.id}
                                                firstName={item.first_name}
                                                lastName={item.last_name}
                                                avatar={item.cover_image}
                                                date={item.date}
                                                preview={item.preview}
                                            />
                                        </Fragment>
                                    ) : (
                                        <ChatElement
                                            key={item.id}
                                            id={item.id}
                                            firstName={item.first_name}
                                            lastName={item.last_name}
                                            avatar={item.cover_image}
                                            date={item.date}
                                            preview={item.preview}
                                        />
                                    ),
                                )
                            ) : (
                                <>
                                    <EmptyChat />
                                    <Gift />
                                </>
                            )}
                            <div className={css.end}>
                                <h5>Phoqer</h5>
                                <p>© 2021</p>
                                <p>All rights reserved</p>
                            </div>
                        </aside>
                        <div className={css.chat}>{test?.length ? <p>Select the chat in side panel</p> : <EmptyChat />}</div>
                    </div>
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
