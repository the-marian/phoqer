import React from 'react';

import { SelectOption, OpenIcon, Order, OrderStatus, EyeIcon } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
    order: Order;
}
export const CardActions = ({ order }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleOpenAllOrders = (): void => {
        navigate(`/${i18n.language}/author/orders`, { state: { status: OrderStatus.ACCEPTED } });
    };

    const handleOpenOrder = (): void => {
        window.open(`/${i18n.language}/offers/${order.offerId}`, '_self');
    };

    return (
        <>
            <SelectOption onClick={handleOpenAllOrders}>
                <EyeIcon />
                {t('View all active orders')}
            </SelectOption>

            <SelectOption onClick={handleOpenOrder}>
                <OpenIcon />
                {t('Open offer')}
            </SelectOption>
        </>
    );
};
