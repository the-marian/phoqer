import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { cutString } from '../../../../../../../assets/helpers';
import routes from '../../../../../../../assets/routes';
import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import { IChats } from '../../../../../../../interfaces';
import NotifNumber from '../../../../../../common/notif-number';
import UserAvatar from '../../../../../../common/user-avatar';
import OnlineIndicator from '../../../../../../common/user-avatar/online-indicator';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: theme.rem(1, 0),
        padding: theme.rem(2),
        borderRadius: theme.radius,
        boxShadow: theme.palette.shadowBorder,
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        ...template(theme).outline,
    },
    unread: {
        background: theme.palette.secondary[0],
    },
    active: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,

        '& p': {
            color: theme.palette.trueWhite,
        },
    },
    flex: {
        display: 'flex',
    },
    title: {
        width: '100%',
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[3],

        ...theme.media(1060).max({
            fontWeight: theme.text.weight[3],
        }),
    },
    inner: {
        width: '100%',
        marginLeft: theme.rem(1),
    },
    online: {
        marginRight: theme.rem(0.4),
    },
    number: {
        position: 'absolute',
        top: theme.rem(0.5),
        right: theme.rem(0.5),
    },
}));

interface IProps {
    active?: boolean;
    chat: IChats;
}

const ChatSidebarItem = ({ chat, active = false }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <Link href={routes.profile.private.messages(chat.chat_id)}>
            <a className={clsx(css.wrp, active && css.active, chat.new_messages && css.unread)}>
                <UserAvatar width={7} height={7} avatar={chat.cover_image || '/no_img.png'} />

                <div className={css.inner}>
                    <h2 className={css.title}>{cutString(chat.title, 55)}</h2>
                    <div className={css.flex}>
                        <OnlineIndicator className={css.online} time={chat.recipient_last_activity} />
                        <p>{`${chat.recipient_first_name} ${chat.recipient_last_name}`}</p>
                    </div>
                    {chat.new_messages ? <NotifNumber className={css.number}>{chat.new_messages}</NotifNumber> : null}
                </div>
            </a>
        </Link>
    );
};

export default ChatSidebarItem;
