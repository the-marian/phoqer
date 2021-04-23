import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../assets/theme';
import useAuth from '../../../hooks/auth.hook';
import useTheme from '../../../hooks/theme.hook';
import { IState } from '../../../interfaces';
import types from '../../../redux/types';
import Drawer from '../../common/drawer';
import Logo from '../../common/logo';
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

        ...theme.media(768).max({
            marginBottom: theme.rem(0),
        }),
    },
    content: {
        margin: theme.rem(4, 0),

        ...theme.media(768).max({
            margin: theme.rem(2, 0),
        }),
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
