import React from 'react';

import { OrdersIcon, OptionsIcon, List, ListLinkItem, ListButtonItem, ChatboxIcon } from 'phoqer';
import { chatsPage } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useLinkClick } from 'src/hook/link-click.hook';

export const Navigation = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const handleClick = useLinkClick();

    return (
        <List>
            <ListLinkItem icon={<OrdersIcon />} href={`/${i18n.language}/client/orders`} onClick={handleClick}>
                {t('My orders')}
            </ListLinkItem>

            <ListLinkItem icon={<OptionsIcon />} href={`/${i18n.language}/client/settings`} onClick={handleClick}>
                {t('My settings')}
            </ListLinkItem>

            <ListButtonItem icon={<ChatboxIcon />} onClick={() => chatsPage.open(i18n.language)}>
                {t('Open chats')}
            </ListButtonItem>
        </List>
    );
};
