import { useRouter } from 'next/router';
import React, { Fragment, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../assets/template';
import { Theme } from '../../../../../../assets/theme';
import { IChat } from '../../../../../../interfaces';
import Gift from '../../../../../common/gift';
import ChatEmpty from '../chat-empty';
import ChatSearch from '../chat-search';
import ChatSidebarItem from './chat-sidebar-item';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: theme.rem(1, 0),
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),

        ...template(theme).outline,
    },
    active: {
        background: theme.palette.gray[1],
    },
    name: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[4],
    },
    inner: {
        width: '100%',
        marginLeft: theme.rem(1),
    },
    text: {
        marginTop: theme.rem(1),
        color: theme.palette.gray[3],
    },
    end: {
        margin: theme.rem(2, 0, 4),
        color: theme.palette.gray[2],
        fontSize: theme.rem(1.4),
        textAlign: 'center',
    },
}));

interface IProps {
    chats: IChat[];
}

const ChatSidebar = ({ chats }: IProps): ReactElement => {
    const css = useStyles();
    const { query } = useRouter();
    const active = String(query.chat || '');

    return (
        <>
            <ChatSearch />
            {chats?.length ? (
                chats.map<ReactElement>((item, index) => (
                    <Fragment key={item.id}>
                        {index === 5 ? <Gift /> : null}
                        <ChatSidebarItem
                            id={item.id}
                            newMessages={item.newMessages}
                            active={String(item.id) === (active || '')}
                            firstName={item.first_name}
                            lastName={item.last_name}
                            avatar={item.cover_image}
                            date={item.date}
                            preview={item.preview}
                        />
                    </Fragment>
                ))
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
        </>
    );
};

export default ChatSidebar;
