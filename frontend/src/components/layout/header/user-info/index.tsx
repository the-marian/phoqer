import React, { ReactElement, useRef, useState } from 'react';

import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import useAuth from '../../../../hooks/auth.hook';
import { IPublicProfile, IState } from '../../../../interfaces';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
import Badge from '../../../common/badge';
import UserAvatar from '../../../common/user-avatar';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    user: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.rem(1.4),
        padding: theme.rem(0.5, 1.5),
        color: theme.palette.black[0],

        ...theme.media(500).max({
            padding: theme.rem(0.5),
        }),

        ...theme.hover({
            '& svg': {
                color: theme.palette.primary[0],
            },
        }),
    },
    badge: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    list: {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(100% + 0.5rem)',
        right: 0,
        width: theme.rem(18),
        padding: theme.rem(0.5, 0),
        borderRadius: theme.radius,
        background: theme.palette.white,
        transition: theme.transitions[0],
        boxShadow: theme.shadow[4],

        '&.enter': {
            opacity: 0,
            transform: 'translateY(-2rem)',
        },
        '&.enter-done': {
            opacity: 1,
            transform: 'translateY(0)',
        },
        '&.exit': {
            opacity: 0,
            transform: 'translateY(-2rem)',
            pointerEvents: 'none',
        },
    },
    item: {
        borderBottom: theme.border(0.1, theme.palette.gray[1]),

        '&:nth-last-of-type(1)': {
            borderBottom: 'none',
        },
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        padding: theme.rem(2),
        fontSize: theme.rem(1.4),
        textAlign: 'right',
        color: theme.palette.black[0],

        ...theme.hover({
            background: theme.palette.primary[0],
            color: theme.palette.trueWhite,
        }),
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        background: 'none',
    },
}));

const UserInfo = (): ReactElement => {
    const css = useStyles();
    const { logout } = useAuth();

    const ref = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(false);
    const handleToggle = (): void => {
        setOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return (
        <>
            {open && <button className={css.backdrop} type="button" onClick={handleToggle} />}
            <div className={css.root}>
                <button ref={ref} type="button" className={css.user} onClick={handleToggle}>
                    <Badge className={css.badge}>14</Badge>
                    <UserAvatar
                        width={3.5}
                        height={3.5}
                        firstName={user?.first_name}
                        lastName={user?.last_name}
                        avatar={user?.profile_img}
                    />
                </button>
                <CSSTransition in={open} unmountOnExit timeout={300}>
                    <ul className={css.list}>
                        <li className={css.item}>
                            <Link href={routes.profile.private}>
                                <a className={css.btn} type="button">
                                    Личный кабинет
                                </a>
                            </Link>
                        </li>

                        <li className={css.item}>
                            <Link href={routes.profile.public(user?.id)}>
                                <a className={css.btn} type="button">
                                    Мой аккаунт
                                </a>
                            </Link>
                        </li>

                        <li className={css.item}>
                            <button className={css.btn} type="button" onClick={handleLogout}>
                                Выйти
                            </button>
                        </li>
                    </ul>
                </CSSTransition>
            </div>
        </>
    );
};

export default UserInfo;
