import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../assets/theme';
import { IAuth, IState } from '../../../interfaces';
import Logo from '../../Common/Logo';
import Container from '../Container';
import Lang from '../Lang';
import GeneralInfo from './GeneralInfo';
import UserInfo from './UserInfo';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        padding: theme.rem(1.4, 0),
        background: theme.palette.white,
        transition: theme.transitions,
    },
    transform: {
        transform: 'translateY(-100%)',
    },
    scrolled: {
        background:
            'linear-gradient(90deg, rgba(250, 250, 250, 1) 25%, rgba(250, 250, 250, 0.97) 50%, rgba(250, 250, 250, 1) 75%)',
    },
    flex: {
        position: 'relative',
        zIndex: 11,
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
    const css = useStyles();
    const [delta, setDelta] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);

    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY < 150 && scrolled) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }

            if (window.scrollY < 300 && !delta) {
                setDelta(false);
                prev = 0;
                return;
            }

            setDelta(prev < window.scrollY);
            prev = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={clsx(css.header, delta && css.transform, scrolled && css.scrolled)}>
            <Container>
                <div className={css.flex}>
                    <div className={css.wrp}>
                        <Logo />
                        <Lang />
                    </div>

                    {auth_token ? <UserInfo /> : <GeneralInfo />}
                </div>
            </Container>
        </header>
    );
};

export default Header;
