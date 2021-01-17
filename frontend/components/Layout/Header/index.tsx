import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { throttle } from '../../../assets/helpers';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import Logo from '../../Common/Logo';
import Container from '../Container';
import GeneralInfo from './GeneralInfo';
import Lang from './Lang';
import UserInfo from './UserInfo';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10000,
        width: '100%',
        padding: theme.rem(1.4, 0),
        background: theme.palette.glass,
        backdropFilter: 'blur(5px)',
        transition: theme.transitions,
    },
    shadow: {
        boxShadow: '0 2rem 2.6rem rgba(0,0,0,0.015)',
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

let prev = 0;

const Header = (): ReactElement => {
    const auth = useAuth();
    const css = useStyles();

    const [shadow, setShadow] = useState<boolean>(true);
    const [delta, setDelta] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = throttle((): void => {
            if (window.scrollY < 100 && !delta) {
                setShadow(false);
                setDelta(false);
                prev = 0;
                return;
            }

            setShadow(true);
            setDelta(prev < window.scrollY);
            prev = window.scrollY;
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
                        <Logo />
                        <Lang />
                    </div>

                    {auth?.auth_token ? <UserInfo /> : <GeneralInfo />}
                </div>
            </Container>
        </header>
    );
};

export default React.memo(Header);
