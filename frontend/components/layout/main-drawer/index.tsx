import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../../assets/routes';
import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTheme from '../../../hooks/theme.hook';
import { IState } from '../../../interfaces';
import types from '../../../redux/types';
import LoginForm from '../../common/auth/login-form';
import Drawer from '../../common/drawer';
import Logo from '../../common/logo';
import { modal } from '../../common/modal';
import SmallModalWrp from '../../common/modal/small-modal-wrp';
import Socials from '../../common/socials';
import Switcher from '../../common/switcher';
import AuthDrawer from './auth-drawer';
import NotAuthDrawer from './not-auth-drawer';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        maxWidth: theme.rem(35),
        minWidth: theme.rem(35),
    },
    link: {
        marginBottom: theme.rem(2),
    },
    content: {
        margin: theme.rem(4, 0),
    },
}));

const MainDrawer = (): ReactElement => {
    const css = useStyles();
    const auth = useAuth();
    const dispatch = useDispatch();

    const [theme, setTheme] = useTheme();
    const drawer = useSelector<IState, boolean>(state => state.config.drawer);

    const handleTheme = (value: boolean): void => {
        setTheme && setTheme(value ? 'black' : 'white');
    };

    const handleToggle = (payload: boolean): void => {
        dispatch({ type: types.TOGGLE_DRAWER, payload });
    };

    return (
        <Drawer onToggle={handleToggle} open={drawer}>
            <Logo className={css.link} link />
            <Switcher onClick={handleTheme} value={theme === 'black'} off="white" on="dark">
                Toggle color theme
            </Switcher>

            <div className={css.content}>{auth?.access_token ? <AuthDrawer /> : <NotAuthDrawer />}</div>

            <Socials style={{ marginTop: '8rem' }} />
        </Drawer>
    );
};

export default MainDrawer;
