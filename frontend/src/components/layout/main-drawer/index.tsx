import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../../../hooks/auth.hook';
import { IState } from '../../../interfaces';
import types from '../../../redux/types';
import { Theme } from '../../../utils/theming/theme';
import Drawer from '../../common/drawer';
import Logo from '../../common/logo';
import Socials from '../../common/socials';

import AuthDrawer from './auth-drawer';
import NotAuthDrawer from './not-auth-drawer';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        maxWidth: theme.rem(35),
        minWidth: theme.rem(35),
    },
    link: {
        position: 'absolute',
        top: theme.rem(0.4),
        left: theme.rem(2),
        marginBottom: theme.rem(2),

        ...theme.media(768).max({
            marginBottom: theme.rem(0),
        }),
    },
    content: {
        margin: theme.rem(4, 0),
    },
}));

const MainDrawer = (): ReactElement => {
    const css = useStyles();
    const { token } = useAuth();
    const dispatch = useDispatch();
    const drawer = useSelector<IState, boolean>(state => state.config.drawer);

    const handleToggle = (payload: boolean): void => {
        dispatch({ type: types.TOGGLE_DRAWER, payload });
    };

    return (
        <Drawer onToggle={handleToggle} open={drawer}>
            <Logo className={css.link} link />

            <div className={css.content}>{token.access_token ? <AuthDrawer /> : <NotAuthDrawer />}</div>
            <Socials style={{ marginTop: '4rem' }} />
        </Drawer>
    );
};

export default MainDrawer;
