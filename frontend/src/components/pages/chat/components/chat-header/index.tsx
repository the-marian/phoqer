import React from 'react';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import useMedia from '../../../../../hooks/media.hook';
import { ChatTypeEnum } from '../../../../../interfaces';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import ChatMobileDrawerButton from '../../chat-sidebar-right/chat-drawer/chat-drawer-button';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        height: theme.rem(5),
        paddingTop: theme.rem(1),

        ...theme.media(1060).max({
            position: 'fixed',
            top: theme.rem(5.6),
            left: '0',
            width: '100%',
            zIndex: '2',
            padding: theme.rem(0.5, 0),
            background: theme.palette.white,
            borderTop: theme.border(0.1, theme.palette.gray[1]),
            borderBottom: theme.border(0.1, theme.palette.gray[1]),
        }),
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: theme.rem(0, 2),
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 'calc(100% / 3)',

        ...theme.media(650).max({
            width: 'calc(100% / 2)',
        }),
    },
    center: {
        ...theme.media(650).max({
            display: 'none',
        }),
    },
    right: {
        justifyContent: 'flex-end',
    },
    left: {
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: theme.rem(2),
        fontWeight: theme.text.weight[4],
    },
    link: {
        ...mixin(theme).btn,
        background: theme.palette.gray[0],
        color: theme.palette.black[0],

        '& span': {
            marginRight: theme.rem(0.5),
            fontWeight: theme.text.weight[4],
        },

        '& svg': {
            marginTop: theme.rem(0.2),
            fontSize: theme.rem(1.4),
        },
    },
}));

export const ChatHeader = (): JSX.Element => {
    const css = useStyles();
    const desktop = useMedia(1300);

    const history = useRouter();
    const type = String(history.query.type || '');
    const chatId = history.query.chat;

    const href = routes.chat.list(type === ChatTypeEnum.AUTHOR ? ChatTypeEnum.CLIENT : ChatTypeEnum.AUTHOR);

    return (
        <div className={css.header}>
            <div className={css.container}>
                <div className={clsx(css.inner, css.left)}>
                    <Link href={href}>
                        <a className={css.link}>
                            <span>{type === ChatTypeEnum.AUTHOR ? 'Я арендую' : 'Я сдаю в аренду'}</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </Link>
                </div>
                <div className={clsx(css.inner, css.center)}>
                    <h2 className={css.title}>{type === ChatTypeEnum.AUTHOR ? 'Я сдаю в аренду' : 'Я арендую'}</h2>
                </div>
                <div className={clsx(css.inner, css.right)}>{!desktop && chatId && <ChatMobileDrawerButton />}</div>
            </div>
        </div>
    );
};
