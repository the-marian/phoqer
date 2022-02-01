import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { createUseStyles } from 'react-jss';

import useAuth from '../../../hooks/auth.hook';
import { Theme } from '../../../utils/theming/theme';
import Logo from '../../common/logo';
import Container from '../container';

import Lang from './lang';
import NotAuth from './not-auth';
import UserInfo from './user-info';

const MainDrawer = dynamic(() => import('../main-drawer'), { ssr: false });

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        position: 'relative',
        zIndex: 10000,
        width: '100%',
        transition: theme.transitions[0],
        background: theme.palette.gray[0],

        ...theme.media(768).max({
            background: theme.palette.white,
            padding: theme.rem(0.3, 0),
        }),
    },
    flex: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrp: {
        display: 'flex',
        alignItems: 'center',
        width: '38%',

        '&:nth-last-of-type(1)': {
            justifyContent: 'flex-end',
            marginRight: theme.rem(-1),
        },
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(3.4),
        width: theme.rem(3.4),
        border: theme.border(0.1, theme.palette.primary[0]),
        borderRadius: '50%',
        transition: theme.transitions[0],

        ...theme.hover({
            background: theme.palette.primary[0],
            color: theme.palette.trueWhite,
        }),
    },
    open: {
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        transform: 'rotate(180deg)',
    },
}));

const Header = (): ReactElement => {
    const css = useStyles();
    const { token } = useAuth();

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
        const handleStart = (): void => {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo({ top: 0 });
        };

        Router.events.on('routeChangeStart', handleStart);
        return () => {
            Router.events.off('routeChangeStart', handleStart);
        };
    }, []);

    return (
        <>
            <header className={css.header}>
                <Container>
                    <div className={css.flex}>
                        <div className={css.wrp}>
                            <Logo link />
                        </div>

                        {!!token.access_token && (
                            <button className={clsx(css.button, open && css.open)} type="button" onClick={handleToggle}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        )}

                        <div className={css.wrp}>
                            <Lang />
                            {token.access_token ? <UserInfo /> : <NotAuth />}
                        </div>
                    </div>
                </Container>
            </header>
            <MainDrawer open={open} onToggle={handleToggle} />
        </>
    );
};

export default Header;
