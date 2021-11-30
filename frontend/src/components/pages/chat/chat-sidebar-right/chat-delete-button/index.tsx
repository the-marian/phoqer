import React from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons/faTrashAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { ChatStatus, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Button from '../../../../common/button';
import { modal } from '../../../../common/modal';
import notifications from '../../../../common/notifications';

import ConfirmRentModal from './confirm-rent-modal';
import DeleteChatModal from './delete-chat-modal';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        width: '100%',
    },
    approve: {
        ...mixin(theme).btn,
        marginRight: theme.rem(1),

        '& svg': {
            marginBottom: theme.rem(0.3),
            marginRight: theme.rem(0.8),
        },
    },
    cancel: {
        ...mixin(theme).btn,
        backgroundColor: theme.palette.white,
        color: theme.palette.black[0],

        '& svg': {
            marginBottom: theme.rem(0.3),
            marginRight: theme.rem(0.8),
            color: theme.palette.red[0],
        },
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[5],
    },
}));

interface IProps {
    className?: string;
}

const ChatDeleteButton = ({ className }: IProps): JSX.Element | null => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useRouter();
    const chatId = +String(history.query.chat || 0);

    const userId = useSelector<IState, number>(state => +(state.user.id || NaN));
    const authorId = useSelector<IState, number>(state => +(state.chat.info.data?.author_id || NaN));

    const chatStatus = useSelector<IState, ChatStatus>(state => state.chat.item.data?.status || ChatStatus.NEW);
    const type = userId === authorId ? 'owner' : 'client';

    const handleDeleteChat = (): void => {
        dispatch({
            type: types.DELETE_CHAT_START,
            payload: chatId,
            callback: () => {
                history.push(routes.chat.list);
                notifications.info({ message: 'Вы успешно удалили чат' });
            },
        });
    };

    const approveRent = (): void => {
        dispatch({
            type: types.UPDATE_CHAT_START,
            payload: chatId,
            status: ChatStatus.APPROVED,
            callback: () => {
                notifications.info({ message: 'Вы успешно одобрили запрос на аренду' });
            },
        });
    };

    const endRent = (): void => {
        dispatch({
            type: types.UPDATE_CHAT_START,
            payload: chatId,
            status: ChatStatus.ARCHIVED,
            callback: () => {
                notifications.info({ message: 'Вы успешно окончили аренду' });
            },
        });
    };

    const repeatRent = (): void => {
        dispatch({
            type: types.UPDATE_CHAT_START,
            payload: chatId,
            status: ChatStatus.NEW,
            callback: () => {
                notifications.info({ message: 'Вы успешно отправили запрос на аренду' });
            },
        });
    };

    const handleDeleteChatModal = (): void => {
        modal.open(<DeleteChatModal onDelete={handleDeleteChat} />);
    };

    const approveChatModal = () => {
        modal.open(<ConfirmRentModal onSubmit={approveRent} />);
    };

    const buttonsMap = {
        owner: {
            [ChatStatus.NEW]: (
                <div className={clsx(css.flex, className)}>
                    <Button primary className={css.approve} onClick={approveChatModal}>
                        Одобрить запрос
                    </Button>
                    <Button onClick={handleDeleteChatModal} className={css.cancel}>
                        Отклонить
                    </Button>
                </div>
            ),
            [ChatStatus.APPROVED]: (
                <div className={clsx(css.flex, className)}>
                    <Button primary className={css.approve} onClick={endRent}>
                        Окончить аренду
                    </Button>
                </div>
            ),
            [ChatStatus.ARCHIVED]: (
                <div className={clsx(css.flex, className)}>
                    <Button onClick={handleDeleteChatModal} className={css.approve}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        <span>Удалить этот чат</span>
                    </Button>
                </div>
            ),
        },
        client: {
            [ChatStatus.NEW]: (
                <>
                    <h2 className={css.title}>
                        Этот чат находится на рассмотрении. Вы можете удалить этот чат до того момента как автор объявления
                        одобрит запрос
                    </h2>
                    <div className={clsx(css.flex, className)}>
                        <Button primary onClick={handleDeleteChatModal} className={css.approve}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <span>Удалить этот чат</span>
                        </Button>
                    </div>
                </>
            ),
            [ChatStatus.APPROVED]: (
                <div className={clsx(css.flex, className)}>
                    <h2 className={css.title}>
                        Вам одобрили аренду этого объявления. Внимание! Только автор объвления может окончить аренду и поместить
                        чат в архив
                    </h2>
                </div>
            ),
            [ChatStatus.ARCHIVED]: (
                <>
                    <h2 className={css.title}>
                        Аренда этого объявления закончилась и чат находится в архиве. Вы можете удалить этот чат или возобновить
                        для повторной аренды
                    </h2>
                    <div className={clsx(css.flex, className)}>
                        <Button primary onClick={repeatRent} className={css.approve}>
                            <span>Повторить аренду</span>
                        </Button>
                        <Button onClick={handleDeleteChatModal} className={css.cancel}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <span>Удалить</span>
                        </Button>
                    </div>
                </>
            ),
        },
    };

    return buttonsMap[type][chatStatus];
};

export default ChatDeleteButton;
