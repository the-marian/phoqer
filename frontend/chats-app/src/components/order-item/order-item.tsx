import React, { useMemo } from 'react';

import { Flex, ID, Order, Text, Overflow, TypographySize, Card, Link, ChevronRightIcon } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './order-item.module.scss';

interface Props {
    order: Order;
    activeOrder: null | ID;
    setActiveOrder: (id: null | ID) => void;
}
export const OrderItem = ({ order, activeOrder, setActiveOrder }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { isReduceAnimations } = useReduceAnimations();

    const isActive = activeOrder === order.id;
    const statusLocale = useMemo(
        () => ({
            Done: t('Done'),
            Rejected: t('Rejected'),
            Pending: t('Pending'),
            Accepted: t('Accepted'),
            Progress: t('Progress'),
        }),
        [t],
    );

    return (
        <Card
            value={order}
            isActive={isActive}
            locale={i18n.language}
            statusLocale={statusLocale}
            isReduceAnimations={isReduceAnimations}
            onClick={() => setActiveOrder(isActive ? null : order.id)}
        >
            <Link format="button" href={`/${i18n.language}/offers/${order.offerId}`}>
                {t('Open offer')}
                <ChevronRightIcon />
            </Link>

            <Flex className={css.info} justify="between">
                <div>
                    <Text size={TypographySize.SM} className={css.gray}>
                        {t('Country')}:
                    </Text>
                    <Text>{order.country}</Text>
                </div>

                <div>
                    <Text size={TypographySize.SM} className={css.gray}>
                        {t('City')}:
                    </Text>
                    <Text>{order.city}</Text>
                </div>

                <div>
                    <Text size={TypographySize.SM} className={css.gray}>
                        {t('Address')}:
                    </Text>
                    <Text>{order.address}</Text>
                </div>
            </Flex>

            <div className={css.mt}>
                <Text size={TypographySize.SM} className={css.gray}>
                    {t('Comment')}:
                </Text>
                <Text>{order.comment || '-'}</Text>
            </div>

            <div className={css.mt}>
                <Text size={TypographySize.SM} className={css.gray}>
                    {t('Description')}:
                </Text>

                <Overflow className={css.overflow} key={order.id} locale={{ more: t('Show more'), less: t('Show less') }}>
                    <div className={css.description} dangerouslySetInnerHTML={{ __html: order.description }} />
                </Overflow>
            </div>
        </Card>
    );
};
