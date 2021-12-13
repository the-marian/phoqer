import React, { ReactElement } from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { ChatType, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import LinkArrow from '../../../../common/link-arrow';
import SegmentedControl, { ISegmentedControlItem } from '../../../../common/segmented-control';

const useStyles = createUseStyles((theme: Theme) => ({
    control: {
        marginBottom: theme.rem(1),

        '& ul': {
            width: '100%',
        },
    },
    root: {
        position: 'relative',
        marginBottom: theme.rem(1),
    },
    input: {
        ...mixin(theme).input,
        paddingRight: theme.rem(8),
        background: theme.palette.white,
        boxShadow: theme.palette.shadowBorder,
    },
    search: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: theme.rem(4),
        width: theme.rem(5),
        color: theme.palette.gray[4],
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        border: theme.border(0.2, 'transparent'),

        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: theme.rem(-0.3),
            transform: 'translateY(-50%)',
            height: '65%',
            width: 0,
            borderLeft: theme.border(0.1, theme.palette.gray[1]),
        },

        ...theme.hover({
            color: theme.palette.primary[0],
        }),
    },
    back: {
        position: 'relative',
        zIndex: 10,
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.3),

        '& a': {
            width: '100%',
            background: theme.palette.gray[1],

            ...theme.hover({
                background: theme.palette.secondary[0],
            }),
        },
    },
}));

const tabs: ISegmentedControlItem[] = [
    {
        id: 'i_am_client',
        text: 'Я арендаю',
    },
    {
        id: 'i_am_author',
        text: 'Я сдаю в аренду',
    },
];

const ChatSearch = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const activeTab = useSelector<IState, ChatType>(state => state.chat.chats.type);

    const changeChatType = (value: string): void => {
        dispatch({ type: types.CHANGE_CHAT_TYPE, payload: value });
        dispatch({ type: types.GET_CHATS_START });
    };

    return (
        <>
            <div className={css.back}>
                <LinkArrow toLeft href={routes.profile.private}>
                    Вернутся в личный кабинет
                </LinkArrow>
            </div>
            <SegmentedControl classNameWrp={css.control} active={activeTab} tabs={tabs} onClick={changeChatType} />
            <div className={css.root}>
                <input type="text" placeholder="Search" className={css.input} />
                <button type="button" className={css.search}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </>
    );
};

export default ChatSearch;
