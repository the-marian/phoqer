import React, { useEffect, useState } from 'react';

import { Link, ChevronRightIcon, OrderStatus, Title, Flex, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useInProgressOrdersContext } from 'src/context/in-progress-orders.context';
import css from 'src/pages/home/shared/card-list.module.scss';
import { CardsLoader } from 'src/pages/home/shared/cards-loader';

import { InProgressOrdersItem } from './in-progress-orders-item';

export const InProgressOrders = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const handleOpenOrders = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        navigate(event.currentTarget.pathname, { state: { status: OrderStatus.IN_PROGRESS } });
    };

    const { orders, fetchData } = useInProgressOrdersContext();
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
                    {t('Your active orders')}
                </Title>

                <Link format="button" href={`/${i18n.language}/author/orders`} onClick={handleOpenOrders}>
                    {t('View All')}
                    <ChevronRightIcon />
                </Link>
            </Flex>

            <div className={css.list}>
                {isLoading ? <CardsLoader /> : orders.data.map(order => <InProgressOrdersItem key={order.id} order={order} />)}
            </div>
        </div>
    );
};
