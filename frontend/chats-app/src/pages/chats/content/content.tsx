import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { ChevronLeftIcon, OptionsIcon, Button, Link } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ChatHead } from 'src/components/chat-head/chat-head';
import { EmptyChat } from 'src/components/empty-chat/empty-chat';
import { Form } from 'src/components/form/form';
import { Messages } from 'src/components/messages/messages';
import { MessagesLoader } from 'src/components/messages/messages-loader';
import { useLinkClick } from 'src/hook/link-click.hook';
import messages from 'src/mock/messages.json';

import css from './content.module.scss';

interface Props {
    open: boolean;
    onToggle: () => void;
}
export const Content = ({ open, onToggle }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const handleClick = useLinkClick();

    const { chatId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chatId) {
            setLoading(true);
            setTimeout(setLoading, 2_000, false);
        }
    }, [chatId]);

    return (
        <div className={classNames(css.content, open && css.open)}>
            <ChatHead>
                <Link className={css.back} onClick={handleClick} href={`/${i18n.language}/chats`}>
                    <ChevronLeftIcon />
                    {t('Back')}
                </Link>

                {chatId && !open && (
                    <Button className={css.button} onClick={onToggle}>
                        {t('Open order info')}
                        <OptionsIcon />
                    </Button>
                )}
            </ChatHead>

            <div className={css.container}>
                {chatId ? (
                    <>
                        {loading ? <MessagesLoader /> : <Messages messages={messages} />}
                        <Form />
                    </>
                ) : (
                    <EmptyChat />
                )}
            </div>
        </div>
    );
};
