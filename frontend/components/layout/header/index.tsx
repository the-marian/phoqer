import clsx from 'clsx';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { throttle } from '../../../assets/helpers';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useMedia from '../../../hooks/media.hook';
import Logo from '../../common/logo';
import SiteMenu from '../../common/site-menu';
import Container from '../container';
import Lang from './lang';
import NotAuth from './not-auth';
import UserInfo from './user-info';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        width: '100%',
        background: theme.palette.gray[0],
        transition: theme.transitions[0],

        ...theme.media(768).max({
            background: theme.palette.white,
            padding: theme.rem(0.3, 0),
        }),
    },
    shadow: {
        background: theme.palette.white,
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
}));

const Header = (): ReactElement => {
    const prev = useRef<number>(0);
    const auth = useAuth();
    const css = useStyles();
    const media = useMedia(1060);

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

    return (
        <header className={clsx(css.header, delta && css.transform, shadow && css.shadow)}>
            <Container>
                <div className={css.flex}>
                    <div className={css.wrp}>
                        <SiteMenu />
                        <Logo link />
                    </div>

                    <div className={css.wrp}>
                        {media ? auth?.access_token ? <UserInfo /> : <NotAuth /> : null}
                        <Lang />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default React.memo(Header);
