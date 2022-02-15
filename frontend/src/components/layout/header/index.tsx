import React, { ReactElement, MouseEvent, useEffect, useRef, useState } from 'react';

import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Router } from 'next/router';
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
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        width: '100%',
        transition: theme.transitions[0],
        background: theme.palette.gray[0],
        cursor: 'pointer',

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
        maxWidth: theme.rem(17),

        '&:nth-last-of-type(1)': {
            justifyContent: 'flex-end',
            marginRight: theme.rem(-1),
        },
    },
    down: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(3.8),
        width: '100%',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        color: theme.palette.primary[0],

        ...theme.hover({
            '&::after': {
                height: theme.rem(3.5),
                width: theme.rem(3.5),
            },

            '& > svg': {
                fontSize: theme.rem(1),
                color: theme.palette.trueWhite,
            },
        }),

        '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            height: 0,
            width: 0,
            borderRadius: '50%',
            background: theme.palette.primary[0],
            transition: theme.transitions[0],
        },

        '& > svg': {
            position: 'relative',
            zIndex: 2,
            fontSize: theme.rem(1.4),
            color: theme.palette.black[0],
            transition: theme.transitions[0],
        },
    },
    open: {
        '& > svg': {
            transition: theme.transitions[0],
            transform: 'rotate(180deg)',
        },
    },
    backdrop: {
        height: theme.rem(5),
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

    const handleClick = (event: MouseEvent<HTMLHeadingElement>): void => {
        if (event.target === event.currentTarget) {
            handleToggle();
        }
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
            <div className={css.backdrop} />
            <header className={css.header} onClick={handleClick} tabIndex={0}>
                <Container>
                    <div className={css.flex} onClick={handleClick} tabIndex={0}>
                        <div className={css.wrp}>
                            <Logo link />
                        </div>

                        {!!token.access_token && (
                            <button type="button" onClick={handleToggle} className={clsx(css.down, open && css.open)}>
                                <FontAwesomeIcon icon={faAngleDoubleDown} />
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
