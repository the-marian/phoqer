import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IPublicProfile, IState } from '../../../../interfaces';
import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';
import Badge from '../../../common/badge';
import UserAvatar from '../../../common/user-avatar';

const MainDrawer = dynamic(() => import('../../main-drawer'), { ssr: false });

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),
        ...theme.media(500).max({
            marginRight: theme.rem(2),
        }),
    },
    item: {
        marginLeft: theme.rem(1),
        borderRadius: theme.radius,

        ...theme.media(768).max({
            marginLeft: theme.rem(0.4),
        }),
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
    textWrp: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        maxWidth: theme.rem(20),
        fontSize: theme.rem(1.2),

        ...theme.media(560).max({
            display: 'none',
        }),
    },
    text: {
        width: '100%',
        marginLeft: theme.rem(1),
        ...mixin(theme).cutString,
    },
    small: {
        width: '100%',
        marginLeft: theme.rem(1),
        color: theme.palette.gray[2],
        ...mixin(theme).cutString,
    },
    icon: {
        marginLeft: theme.rem(0.5),
        transition: theme.transitions[0],
    },
    open: {
        transform: 'rotate(180deg)',
    },
}));

const UserInfo = (): ReactElement => {
    const css = useStyles();

    const scrollRef = useRef<number>(0);
    const [open, setOpen] = useState(false);

    const handleToggle = (): void => {
        if (!open) {
            scrollRef.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo({ top: scrollRef.current });
            scrollRef.current = 0;
        }

        setOpen(prev => !prev);
    };

    useEffect(() => {
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo({ top: 0 });
        };
    }, []);

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);

    return (
        <>
            <button type="button" className={css.user} onClick={handleToggle}>
                <Badge className={css.badge}>14</Badge>
                <UserAvatar
                    width={3.5}
                    height={3.5}
                    firstName={user?.first_name}
                    lastName={user?.last_name}
                    avatar={user?.profile_img}
                />
                <FontAwesomeIcon className={clsx(css.icon, open && css.open)} icon={faChevronDown} />
            </button>
            <MainDrawer open={open} onToggle={handleToggle} />
        </>
    );
};

export default UserInfo;
