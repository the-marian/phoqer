import React, { ReactElement } from 'react';

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import types from '../../../../../../redux/types';
import mixin from '../../../../../../utils/theming/mixin';
import { Theme } from '../../../../../../utils/theming/theme';
import Tooltip from '../../../../../common/tooltip';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        ...mixin(theme).btn,

        '& span': {
            marginLeft: theme.rem(0.5),
            fontWeight: theme.text.weight[4],
        },
    },
}));

const ChatMobileDrawerButton = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const handleToggle = (): void => {
        dispatch({ type: types.TOGGLE_CHAT_DRAWER });
    };

    return (
        <Tooltip content="Нажмите чтобы просмотреть дополнительную информацию">
            <button className={css.btn} onClick={handleToggle} type="button">
                <FontAwesomeIcon icon={faEllipsisV} />
                <span>Подробнее</span>
            </button>
        </Tooltip>
    );
};

export default ChatMobileDrawerButton;
