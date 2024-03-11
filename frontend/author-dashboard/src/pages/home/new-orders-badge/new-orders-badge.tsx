import React from 'react';

import { NotificationsIcon } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { useNewOrdersContext } from 'src/context/new-orders.context';
import { useLinkClick } from 'src/hook/link-click.hook';

import css from './new-orders-badge.module.scss';

export const NewOrdersBadge = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    const handleClick = useLinkClick();
    const { orders } = useNewOrdersContext();

    return orders.totalItems ? (
        <a href={`/${i18n.language}/author/orders`} className={css.btn} onClick={handleClick}>
            <p
                dangerouslySetInnerHTML={{
                    __html: t('You have {{amount}} new requests', { amount: `<b>${orders.totalItems}</b>` }),
                }}
            />

            <div className={css.icon}>
                <NotificationsIcon />
            </div>
        </a>
    ) : (
        <></>
    );
};
