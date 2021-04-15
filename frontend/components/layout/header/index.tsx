import clsx from 'clsx';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { throttle } from '../../../assets/helpers';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useMedia from '../../../hooks/media.hook';
import types from '../../../redux/types';
import Container from '../../common/container';
import Logo from '../../common/logo';
import Lang from './lang';
import MenuIcon from './menu-icon';
import NotAuth from './not-auth';
import UserInfo from './user-info';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        width: '100%',
        padding: theme.rem(1.4, 0),
        background: theme.palette.glass[1],
        backdropFilter: 'blur(2px)',
        transition: theme.transitions[0],

        ...theme.media(768).max({
            background: theme.palette.white,
        }),
    },
    shadow: {
        background: theme.palette.glass[0],
        boxShadow: theme.shadow[0],
    },
    transform: {
        transform: 'translateY(-100%)',
    },
    flex: {
        position: 'relative',
        zIndex: 10001,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrp: {
        display: 'flex',
        alignItems: 'center',
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.rem(2),
        paddingRight: theme.rem(1),
        fontSize: theme.rem(1.8),
        color: theme.palette.black[0],

        '& svg': {
            marginRight: theme.rem(1),
        },

        ...theme.hover({
            '& div span': {
                left: '120%',
            },
        }),

        ...theme.media(768).max({
            marginRight: '0',
        }),
    },
}));

const Header = (): ReactElement => {
    const prev = useRef<number>(0);
    const auth = useAuth();
    const css = useStyles();
    const media = useMedia(768);
    const dispatch = useDispatch();

    const [shadow, setShadow] = useState<boolean>(false);
    const [delta, setDelta] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = throttle((): void => {
            if (window.scrollY < 100 && !delta) {
                setShadow(false);
                setDelta(false);
                prev.current = 0;
                return;
            }

            setShadow(true);
            setDelta(prev.current < window.scrollY);
            prev.current = window.scrollY;
        }, 300);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenu = (): void => {
        dispatch({ type: types.TOGGLE_DRAWER });
    };

    return (
        <header className={clsx(css.header, delta && css.transform, shadow && css.shadow)}>
            <Container>
                <div className={css.flex}>
                    <div className={css.wrp}>
                        <button className={css.menu} onClick={handleMenu}>
                            <MenuIcon />
                            <span>Menu</span>
                        </button>
                        <Logo link />
                    </div>

                    <div className={css.wrp}>
                        {auth?.access_token ? <UserInfo /> : media ? <NotAuth /> : null}
                        <Lang />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default React.memo(Header);
