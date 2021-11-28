import React, { ReactElement } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';
import Tooltip from '../../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        position: 'fixed',
        top: theme.rem(6.8),
        right: 0,
        zIndex: 25,
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(6),
        width: theme.rem(4.5),
        fontSize: theme.rem(1.4),
        background: theme.palette.primary[1],
        color: theme.palette.trueWhite,
        borderRadius: '0.5rem 0 0 0.5rem',
        boxShadow: theme.shadow[2],

        ...theme.media(1060).min({
            height: theme.rem(6),
            width: theme.rem(5.5),
        }),
    },
}));

const ChatMobileDrawerButton = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const handleToggle = (): void => {
        dispatch({ type: types.TOGGLE_CHAT_DRAWER });
    };

    return (
        <button className={css.btn} onClick={handleToggle} type="button">
            <Tooltip content="Нажмите чтобы просмотреть дополнительную информацию">
                <div className={css.inner}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            </Tooltip>
        </button>
    );
};

export default ChatMobileDrawerButton;
