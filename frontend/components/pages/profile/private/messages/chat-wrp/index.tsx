import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import ChatEmpty from '../chat-empty';
import ChatSidebar from './chat-sidebar';

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
// const test2 = [];

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: 'calc(100vh - 8.5rem)',
        flexGrow: 2,
        padding: theme.rem(0, 2, 2),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            height: 'auto',
            padding: theme.rem(0, 0, 1),
        }),
    },
    sidebar: theme.media(1060).max({
        height: 'auto',
    }),
    aside: {
        minWidth: theme.rem(40),
        maxWidth: theme.rem(40),
        height: '100%',
        paddingRight: theme.rem(1),
        overflow: 'auto',

        ...theme.media(1060).max({
            minWidth: 'unset',
            maxWidth: 'unset',
            width: '100%',
            padding: theme.rem(0, 1.5),
        }),
    },
    inner: {
        height: 'auto',
    },
}));

interface IProps {
    active?: string | number;
    children: ReactElement | null;
    showSidebar?: boolean;
    showConversation?: boolean;
}

const ChatWrp = ({ children, active, showConversation = false, showSidebar = false }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <>
            <div className={clsx(css.root, showSidebar && css.sidebar)}>
                {showSidebar ? (
                    <aside className={css.aside}>
                        <div className={css.inner}>
                            <ChatSidebar active={active} chats={test} />
                        </div>
                    </aside>
                ) : null}
                {showConversation ? test?.length ? children : <ChatEmpty /> : null}
            </div>
        </>
    );
};

export default ChatWrp;
