import React from 'react';

import { PlusIcon, OrdersIcon, OffersIcon, List, ListButtonItem, ListLinkItem, ChatboxIcon } from 'phoqer';
import { chatsPage } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useLinkClick } from 'src/hook/link-click.hook';

export const Navigation = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const handleClick = useLinkClick();

    return (
        <List>
            <ListLinkItem icon={<OrdersIcon />} href={`/${i18n.language}/author/orders`} onClick={handleClick}>
                {t('Rent requests')}
            </ListLinkItem>

            <ListLinkItem icon={<OffersIcon />} href={`/${i18n.language}/author/offers`} onClick={handleClick}>
                {t('Your offers')}
            </ListLinkItem>

            <ListLinkItem icon={<PlusIcon />} href={`/${i18n.language}/author/new-offer`} onClick={handleClick}>
                {t('Create new offer')}
            </ListLinkItem>

            <ListButtonItem icon={<ChatboxIcon />} onClick={() => chatsPage.open(i18n.language)}>
                {t('Open chats')}
            </ListButtonItem>
        </List>
    );
};
