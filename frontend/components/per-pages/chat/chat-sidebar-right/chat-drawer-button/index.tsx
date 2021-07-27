import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import useMedia from '../../../../../hooks/media.hook';
import types from '../../../../../redux/types';
import { Theme } from '../../../../../utils/theming/theme';
import Tooltip from '../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        position: 'fixed',
        top: theme.rem(0.4),
        right: 0,
        zIndex: 25,

        ...theme.media(1060).min({
            top: theme.rem(6),
        }),
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(5),
        width: theme.rem(6),
        fontSize: theme.rem(1.4),
        background: theme.palette.primary[1],
        color: theme.palette.trueWhite,
        borderRadius: '0.5rem 0 0 0.5rem',

        ...theme.media(1060).min({
            height: theme.rem(5),
            width: theme.rem(5),
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
