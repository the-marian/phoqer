import { useRouter } from 'next/router';
import React, { Fragment, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../../../../assets/template';
import { Theme } from '../../../../../../assets/theme';
import useMedia from '../../../../../../hooks/media.hook';
import { IChats } from '../../../../../../interfaces';
import Gift from '../../../../../common/gift';
import ChatEmpty from '../empty-state/chat-empty';
import ChatSearch from './chat-search';
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
    chats: IChats[];
}

const ChatSidebar = ({ chats }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);
    const { query } = useRouter();
    const active = +String(query.chat || '0');

    return (
        <>
            <ChatSearch />
            {chats?.length ? (
                chats.map<ReactElement>((item, index) => (
                    <Fragment key={item.chat_id}>
                        {index === 5 ? <Gift style={{ padding: '5rem 2rem' }} /> : null}
                        <ChatSidebarItem chat={item} active={active === item.chat_id} />
                    </Fragment>
                ))
            ) : (
                <ChatEmpty height={media ? 50 : 40} />
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
