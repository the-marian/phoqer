import axios from 'axios';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
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

        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
            width: '100%',
            height: '100%',
            background:
                'linear-gradient(90deg, rgba(253,253,253,0.99) 20%, rgba(253,253,253,0.95) 50%, rgba(253,253,253,0.99) 80%)',
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

const Header = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { auth_token } = useSelector<IState, IAuth>(state => state.auth);
    const isLogin = auth_token && axios.defaults.headers.common.Authorization;

    useEffect(() => {
        if (isLogin) {
            dispatch({ type: types.GET_USER_START });
        }
    }, [dispatch, isLogin]);

    // useEffect(() => {
    //     const handleScroll = (e: Window): void => {
    //         console.log(e);
    //     }
    //
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
    // }, [])

    return (
        <header className={css.header}>
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
