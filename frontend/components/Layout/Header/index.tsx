import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../assets/theme';
import { IAuth, IState } from '../../../interfaces';
import types from '../../../redux/types';
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
        transition: theme.transitions,

        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(250,250,250,1) 25%, rgba(250,250,250,0.9) 50%, rgba(250,250,250,1) 75%)',
        },
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
    const dispatch = useDispatch();
    const [delta, setDelta] = useState<boolean>(true);

    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);
    const isLogin = auth_token && axios.defaults.headers.common.Authorization;

    useEffect(() => {
        if (isLogin) {
            dispatch({ type: types.GET_USER_START });
        }
    }, [dispatch, isLogin]);

    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY < 300 && delta) {
                setDelta(true);
                prev = 0;
                return;
            }

            if (window.scrollY < 0 && delta) {
                setDelta(true);
                prev = 0;
                return;
            }

            setDelta(prev > window.scrollY);
            prev = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={css.header} style={delta ? {} : { transform: 'translateY(-100%)' }}>
            <Container>
                <div className={css.flex}>
                    <div className={css.wrp}>
                        <Logo />
                        <Lang />
                    </div>

                    {isLogin ? <UserInfo /> : <GeneralInfo />}
                </div>
            </Container>
        </header>
    );
};

export default Header;
