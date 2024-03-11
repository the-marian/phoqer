import React from 'react';

import { useMedia, useOpen } from 'phoqer';
import { Appear } from 'phoqer-shared';
import { useParams } from 'react-router-dom';

import { Content } from 'src/pages/chats/content/content';
import { Orders } from 'src/pages/chats/orders/orders';
import { Sidebar } from 'src/pages/chats/sidebar/sidebar';

import css from './chats.module.scss';

const HomePage = (): JSX.Element => {
    const { chatId } = useParams();

    const offer = useOpen();
    const isMobile = useMedia(1200);

    return (
        <Appear>
            <div className={css.container}>
                <Sidebar open={!chatId || !isMobile} />
                <Content open={Boolean(chatId && offer.open)} onToggle={offer.onToggle} />
                <Orders open={Boolean(chatId && offer.open)} onClose={offer.onClose} />
            </div>
        </Appear>
    );
};

export default HomePage;
