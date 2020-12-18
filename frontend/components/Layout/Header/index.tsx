import clsx from 'clsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { throttle } from '../../../assets/helpers';
import { Theme } from '../../../assets/theme';
import { IAuth, IState } from '../../../interfaces';
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
        background: theme.palette.white,
        transition: theme.transitions,
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
    const css = useStyles();
    const [delta, setDelta] = useState<boolean>(false);
    const [scrolled] = useState<boolean>(true);
    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);

    useEffect(() => {
        const handleScroll = throttle((): void => {
            if (window.scrollY < 100 && !delta) {
                // setScrolled(false);
                setDelta(false);
                prev = 0;
                return;
            }

            // setScrolled(true);
            setDelta(prev < window.scrollY);
            prev = window.scrollY;
        }, 300);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={clsx(css.header, delta && css.transform)}
            style={scrolled ? { background: 'linear-gradient(93.4deg, #EDFBC9 0%, #E5F4BF 23.83%, #CCDD9F 100%)' } : {}}
        >
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
