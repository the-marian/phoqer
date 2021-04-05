import React, { Fragment, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import Gift from '../../../../../Common/Gift';
import ChatEmpty from '../ChatEmpty';
import ChatSearch from './ChatSearch';
import ChatSidebar from './ChatSidebar';

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

        ...theme.media(768).max({
            padding: theme.rem(0, 0, 1),
        }),
    },
    aside: {
        minWidth: theme.rem(40),
        maxWidth: theme.rem(40),
        height: '100%',
        paddingRight: theme.rem(1),
        overflow: 'auto',

        ...theme.media(768).max({
            minWidth: 'unset',
            maxWidth: 'unset',
            width: '100%',
            padding: theme.rem(0, 1.5),
        }),
    },
    inner: {
        height: 'auto',
    },
    end: {
        margin: theme.rem(2, 0, 4),
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.4),
        textAlign: 'center',
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
            <div className={css.root}>
                {showSidebar ? (
                    <aside className={css.aside}>
                        <div className={css.inner}>
                            <ChatSearch />
                            {test?.length ? (
                                test.map((item, index) =>
                                    index === 3 ? (
                                        <Fragment key={item.id}>
                                            <Gift />
                                            <ChatSidebar
                                                id={item.id}
                                                active={item.id === +(active || '')}
                                                firstName={item.first_name}
                                                lastName={item.last_name}
                                                avatar={item.cover_image}
                                                date={item.date}
                                                preview={item.preview}
                                            />
                                        </Fragment>
                                    ) : (
                                        <ChatSidebar
                                            key={item.id}
                                            id={item.id}
                                            active={item.id === +(active || '')}
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
                                    <ChatEmpty />
                                    <Gift />
                                </>
                            )}
                            <div className={css.end}>
                                <h5>Phoqer</h5>
                                <p>© 2021</p>
                                <p>All rights reserved</p>
                            </div>
                        </div>
                    </aside>
                ) : null}
                {showConversation ? test?.length ? children : <ChatEmpty /> : null}
            </div>
        </>
    );
};

export default ChatWrp;
