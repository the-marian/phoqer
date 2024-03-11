import React from 'react';

import { EyeIcon, OpenIcon, Order, OrderStatus, SelectOption } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Props {
    order: Order;
}
export const CardActions = ({ order }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleOpenAllOrders = (): void => {
        navigate(`/${i18n.language}/client/orders`, { state: { status: OrderStatus.ACCEPTED } });
    };

    const handleOpenOffer = (): void => {
        window.open(`/${i18n.language}/offers/${order.offerId}`, '_self');
    };

    return (
        <>
            <SelectOption onClick={handleOpenAllOrders}>
                <EyeIcon />
                {t('View your orders')}
            </SelectOption>

            <SelectOption onClick={handleOpenOffer}>
                <OpenIcon />
                {t('Open offer')}
            </SelectOption>
        </>
    );
};
