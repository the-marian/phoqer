import React, { ReactElement } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';
import Tooltip from '../../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        position: 'fixed',
        top: theme.rem(6.8),
        right: 0,
        zIndex: 25,
        transition: theme.transitions[0],
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(6),
        width: theme.rem(4.5),
        fontSize: theme.rem(1.4),
        background: theme.palette.white,
        color: theme.palette.black[0],
        borderRadius: '0.5rem 0 0 0.5rem',
        boxShadow: theme.shadow[3],
        border: theme.border(0.2, theme.palette.primary[0]),
        borderRight: 'none',
        transition: theme.transitions[0],

        ...theme.hover({
            width: theme.rem(5),
        }),

        ...theme.media(1060).min({
            height: theme.rem(6),
            width: theme.rem(5.5),

            ...theme.hover({
                width: theme.rem(6),
            }),
        }),
    },
    hide: {
        transform: 'translateX(100%)',
    },
}));

const ChatMobileDrawerButton = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const drawer = useSelector<IState, boolean>(state => state.config.chatDrawer);

    const handleToggle = (): void => {
        dispatch({ type: types.TOGGLE_CHAT_DRAWER });
    };

    return (
        <button className={clsx(css.btn, drawer && css.hide)} onClick={handleToggle} type="button">
            <Tooltip content="Нажмите чтобы просмотреть дополнительную информацию">
                <div className={css.inner}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            </Tooltip>
        </button>
    );
};

export default ChatMobileDrawerButton;
