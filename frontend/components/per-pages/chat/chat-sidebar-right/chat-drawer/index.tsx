import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import { Theme } from '../../../../../utils/theming/theme';
import Drawer from '../../../../common/drawer';
import Logo from '../../../../common/logo';
import ChatSidebarRight from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    link: {
        position: 'absolute',
        top: theme.rem(0.4),
        left: theme.rem(2),
        marginBottom: theme.rem(2),

        ...theme.media(768).max({
            marginBottom: theme.rem(0),
        }),
    },
}));

const ChatMobileDrawer = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const drawer = useSelector<IState, boolean>(state => state.config.chatDrawer);

    const handleToggle = (payload: boolean): void => {
        dispatch({ type: types.TOGGLE_CHAT_DRAWER, payload });
    };

    return (
        <Drawer right onToggle={handleToggle} open={drawer}>
            <Logo className={css.link} link />
            <ChatSidebarRight />
        </Drawer>
    );
};

export default ChatMobileDrawer;
