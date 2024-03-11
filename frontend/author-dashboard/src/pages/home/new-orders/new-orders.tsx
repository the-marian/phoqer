import React, { useEffect, useState } from 'react';

import { ChevronRightIcon, Flex, Link, OrderStatus, Title, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useNewOrdersContext } from 'src/context/new-orders.context';
import { NewOrdersItem } from 'src/pages/home/new-orders/new-orders-item';
import css from 'src/pages/home/shared/card-list.module.scss';
import { CardsLoader } from 'src/pages/home/shared/cards-loader';

export const NewOrders = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const handleOpenOrders = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        navigate(event.currentTarget.pathname, { state: { status: OrderStatus.PENDING } });
    };

    const { orders, fetchData } = useNewOrdersContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData().finally(() => setIsLoading(false));
    }, [fetchData]);

    if (!orders.data.length) return <></>;

    return (
        <div className={css.root}>
            <Flex className={css.header} align="center" justify="between">
                <Title as="h2" size={TypographySize.SM}>
                    {t('New orders')}
                </Title>

                <Link format="button" href={`/${i18n.language}/author/orders`} onClick={handleOpenOrders}>
                    {t('View All')}
                    <ChevronRightIcon />
                </Link>
            </Flex>

            <div className={css.list}>
                {isLoading ? <CardsLoader /> : orders.data.map(order => <NewOrdersItem key={order.id} order={order} />)}
            </div>
        </div>
    );
};
