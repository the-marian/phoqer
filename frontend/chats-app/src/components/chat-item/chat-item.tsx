import React from 'react';

import classNames from 'classnames';
import { Avatar, ID, Text, Title, TypographySize, useDate } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import css from './chat-item.module.scss';

interface Props {
    isTyping?: boolean;
    chat: {
        id: ID;
        time: Date | number | string;
        message: string;
        lastName: string;
        firstName: string;
        avatar?: string | null;
    };
}
export const ChatItem = ({ chat, isTyping = false }: Props): JSX.Element => {
    const date = useDate();
    const { t, i18n } = useTranslation();
    const { chatId } = useParams();

    return (
        <Link
            to={`/${i18n.language}/chats/${chat.id}`}
            className={classNames(css.item, chatId === String(chat.id) && css.active)}
        >
            <Avatar src={chat.avatar} className={css.avatar} />

            <div className={css.content}>
                <div className={css.head}>
                    <Title as="h3" size={TypographySize.SX} className={css.name}>
                        {chat.firstName} {chat.lastName}
                    </Title>
                    <Text as="small" size={TypographySize.SM}>
                        {date(chat.time).format('hh:mm')}
                    </Text>
                </div>

                <Text className={css.text}>{isTyping ? t('typing ...') : chat.message}</Text>
            </div>
        </Link>
    );
};
