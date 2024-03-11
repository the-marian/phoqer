import React, { useEffect, useState } from 'react';

import { UserCard, Scroll, Scrollbars, SelectOption, generateHTML } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { Options } from 'src/components/messages/options';
import { useCopy } from 'src/hook/copy.hook';
import { Message } from 'src/types/messages.type';

import css from './messages.module.scss';

interface Props {
    messages: Message[];
}

export const Messages = ({ messages }: Props): JSX.Element => {
    const copy = useCopy();
    const { t } = useTranslation();
    const [scroll, setScroll] = useState<Scrollbars | null>(null);

    useEffect(() => {
        if (scroll) {
            scroll.scrollToBottom();
        }
    }, [scroll]);

    return (
        <Scroll ref={setScroll} className={css.scroll}>
            <div className={css.empty} />

            <div className={css.inner}>
                {messages.map(message => (
                    <div key={message.id} className={css.message}>
                        <div className={css.head}>
                            <a href={`/users/${message.user.id}`}>
                                <UserCard user={message.user} />
                            </a>

                            <Options scrollRef={scroll}>
                                {onClose => (
                                    <>
                                        <SelectOption
                                            onClick={() => {
                                                copy(message.content);
                                                onClose();
                                            }}
                                        >
                                            {t('Copy this message')}
                                        </SelectOption>
                                    </>
                                )}
                            </Options>
                        </div>

                        <div className={css.content} dangerouslySetInnerHTML={{ __html: generateHTML(message.content) }} />
                    </div>
                ))}
            </div>

            <div className={css.empty} />
        </Scroll>
    );
};
