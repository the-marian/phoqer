import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import useMedia from '../../../../../../hooks/media.hook';
import types from '../../../../../../redux/types';
import { Theme } from '../../../../../../utils/theming/theme';
import Tooltip from '../../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes init': {
        '0%': { top: theme.rem(0.6) },
        '30%': { top: theme.rem(0.2) },
        '50%': { top: theme.rem(0.6) },
        '70%': { top: theme.rem(0.1) },
        '100%': { top: theme.rem(0.6) },
    },
    '@keyframes width': {
        '0%': { width: theme.rem(6) },
        '30%': { width: theme.rem(8) },
        '50%': { width: theme.rem(6) },
        '70%': { width: theme.rem(7) },
        '100%': { width: theme.rem(6) },
    },
    btn: {
        position: 'fixed',
        top: theme.rem(0.8),
        right: 0,
        zIndex: 25,
        animation: '$init 0.6s ease-in-out 2s',
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(4),
        width: theme.rem(6),
        fontSize: theme.rem(1.4),
        background: theme.palette.primary[1],
        color: theme.palette.trueWhite,
        borderRadius: '0.5rem 0 0 0.5rem',
        boxShadow: theme.shadow[2],
        animation: '$width 0.6s ease-in-out 2.6s',

        ...theme.media(1060).min({
            height: theme.rem(4),
        }),
    },
}));

const ChatMobileDrawerButton = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const media = useMedia(1060);

    const handleToggle = (): void => {
        dispatch({ type: types.TOGGLE_CHAT_DRAWER });
    };

    return (
        <button className={css.btn} onClick={handleToggle} type="button">
            <Tooltip content="Нажмите чтобы просмотреть дополнительную информацию">
                <div className={css.inner}>
                    <FontAwesomeIcon icon={media ? faChevronLeft : faEllipsisH} />
                </div>
            </Tooltip>
        </button>
    );
};

export default ChatMobileDrawerButton;
