import axios from 'axios';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { IAuth, IState } from '../../../interfaces';
import types from '../../../redux/types';
import Logo from '../../Base/Logo';
import Lang from '../../Lang';
import Container from '../Container';
import GeneralInfo from './GeneralInfo';
import UserInfo from './UserInfo';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        width: '100%',
        padding: theme.rem(1.4, 0),
    },
    flex: {
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
