import React from 'react';

import { ChevronRightIcon, Flex, Link, OrderCard, OrderInfo, OrdersList, OrderStatus, Title, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CardActions } from 'src/pages/home/shared/card-actions';
import { CardsLoader } from 'src/pages/home/shared/cards-loader';
import { useOrderTimer } from 'src/pages/home/shared/order-timer.hook';

import css from './card-list.module.scss';

interface Props {
    title: string;
    isLoading: boolean;
    orders: OrdersList;
}
export const OrdersPreview = ({ isLoading, orders, title }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const orderTimer = useOrderTimer();

    const navigate = useNavigate();
    const handleOpenOrders = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        navigate(event.currentTarget.pathname, { state: { status: orders?.data?.[0]?.status } });
    };

    return (
        <div className={css.root}>
            <Flex className={css.header} align="center" justify="between">
                <Title size={TypographySize.SM}>{title}</Title>

                <Link format="button" href={`/${i18n.language}/client/orders`} onClick={handleOpenOrders}>
                    {t('View All')}
                    <ChevronRightIcon />
                </Link>
            </Flex>

            <div className={css.list}>
                {isLoading ? (
                    <CardsLoader />
                ) : (
                    orders.data.map(order => {
                        const isInProgress = order.status === OrderStatus.IN_PROGRESS && order.startDate;

                        return (
                            <OrderCard key={order.id} order={order} options={<CardActions order={order} />}>
                                <OrderInfo
                                    order={order}
                                    label={isInProgress ? orderTimer(order.startDate as string) : t('Not started yet ...')}
                                />
                            </OrderCard>
                        );
                    })
                )}
            </div>
        </div>
    );
};
