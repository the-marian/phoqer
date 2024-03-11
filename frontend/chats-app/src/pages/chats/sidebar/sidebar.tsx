import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { Scroll } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { Backdrop } from 'src/components/backdrop/backdrop';
import { ChatHead } from 'src/components/chat-head/chat-head';
import { ChatItem } from 'src/components/chat-item/chat-item';
import { ChatItemLoader } from 'src/components/chat-item/chat-item-loader';
import chats from 'src/mock/chats.json';

import css from './sidebar.module.scss';

interface Props {
    open: boolean;
}
export const Sidebar = ({ open }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(setLoading, 2_000, false);
    }, []);

    return (
        <>
            <Backdrop open={open} />

            <div className={classNames(css.sidebar, open && css.open)}>
                <Scroll className={css.scroll}>
                    <div className={css.inner}>
                        <ChatHead>{t('Messages')}</ChatHead>

                        <div className={css.p2}>
                            {loading ? <ChatItemLoader /> : chats.map(chat => <ChatItem key={chat.id} chat={chat} />)}
                        </div>
                    </div>
                </Scroll>
            </div>
        </>
    );
};
