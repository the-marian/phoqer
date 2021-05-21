import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { onlineStatus } from '../../../../../../../assets/helpers';
import routes from '../../../../../../../assets/routes';
import template from '../../../../../../../assets/template';
import { Theme } from '../../../../../../../assets/theme';
import NotifNumber from '../../../../../../common/notif-number';
import UserAvatar from '../../../../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: theme.rem(1, 0),
        padding: theme.rem(3, 2),
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[1]),
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        ...theme.hover({
            background: theme.palette.secondary[0],
            '& h2': {
                textDecoration: 'underline',
            },
        }),
    },
    unread: {
        background: theme.palette.secondary[0],
    },
    active: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        pointerEvents: 'none',

        '& p': {
            color: theme.palette.trueWhite,
        },
    },
    name: {
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
    text: {
        marginTop: theme.rem(0.2),
        color: theme.palette.gray[3],
    },
    number: {
        position: 'absolute',
        top: theme.rem(0.5),
        right: theme.rem(0.5),
    },
}));

interface IProps {
    id: string | number;
    active?: boolean;
    newMessages?: number;
    avatar?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    date?: string | null;
    preview?: string | null;
}

const MAX_LENGTH = 30;

const ChatSidebarItem = ({
    id,
    newMessages = 0,
    active = false,
    avatar,
    firstName = '',
    lastName = '',
    date,
    preview = '',
}: IProps): ReactElement => {
    const css = useStyles();
    const history = useRouter();

    return (
        <Link href={routes.profile.private.messages(id)}>
            <a className={clsx(css.wrp, active && css.active, newMessages && css.unread)}>
                <UserAvatar
                    width={7}
                    height={7}
                    firstName={firstName || ''}
                    lastName={lastName || ''}
                    avatar={avatar}
                    time={date}
                />

                <div className={css.inner}>
                    <h2 className={css.name}>{`${firstName} ${lastName}`}</h2>
                    <p>{onlineStatus({ initDate: date, locale: history.locale })}</p>
                    <p className={css.text}>
                        {(preview || '').length > MAX_LENGTH ? preview?.slice(0, MAX_LENGTH) + '...' : preview}
                    </p>
                    {newMessages ? <NotifNumber className={css.number}>{newMessages}</NotifNumber> : null}
                </div>
            </a>
        </Link>
    );
};

export default ChatSidebarItem;
