import { FC, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useReduceAnimations } from 'src/context';
import { StatusBadge } from 'src/design-system/data-display/status-badge/status-badge';
import { Tooltip } from 'src/design-system/feedback/tooltip/tooltip';
import { Text, Heading } from 'src/design-system/foundation';
import { EllipsisHorizontalIcon } from 'src/design-system/icons';
import { Dropdown, IconButton } from 'src/design-system/inputs';
import { Flex } from 'src/design-system/layout';
import { Image } from 'src/design-system/media/image/image';
import { useIsOpen } from 'src/hooks';
import { useCurrency } from 'src/hooks/currency.hook';
import { useDate } from 'src/hooks/date.hook';
import { Order } from 'src/types/orders.type';

import css from './order.module.scss';

const MAX_SUM = 100_000;
const INTERVAL_TIME = 1_000;
const ONE_HOUR_IN_MS = 3_600_000;

const countSum = (price: number, date?: string | number): number => {
    if (!date) return 0;

    const delta = Date.now() - new Date(date).valueOf();
    const deltaHours = delta / ONE_HOUR_IN_MS;
    return deltaHours * price;
};

export const OrderOptions: FC<PropsWithChildren> = ({ children }) => {
    const { isOpen, onClose, onToggle } = useIsOpen();

    return (
        <div className={css.orderOptions}>
            <IconButton label="Options" className={css.options} onClick={onToggle}>
                <EllipsisHorizontalIcon />
            </IconButton>

            <Dropdown isOpen={isOpen} onClose={onClose} position="right" className={css.dropdown}>
                {children}
            </Dropdown>
        </div>
    );
};

export interface CounterProps {
    order: Order;
    label: string;
    locale?: string;
}
export const OrderTimer: FC<CounterProps> = ({ order, locale = 'en-US', label }) => {
    const date = useDate();
    const currency = useCurrency();
    const { isReduceAnimations } = useReduceAnimations();

    const intervalId = useRef<NodeJS.Timer | null>(null);
    const [sum, setSum] = useState<number>(() => countSum(order.price, order.startDate));

    useEffect(() => {
        if (!isReduceAnimations) {
            intervalId.current = setInterval(() => {
                setSum(countSum(order.price, order.startDate));
            }, INTERVAL_TIME);

            return () => {
                if (intervalId.current) {
                    clearInterval(intervalId.current);
                }
            };
        }
    }, [order, isReduceAnimations]);

    const price = currency.format(sum, locale);

    return (
        <>
            {isReduceAnimations && sum < MAX_SUM ? (
                <Heading as="p" size="lg" className={css.price}>
                    {price}
                </Heading>
            ) : (
                <Tooltip label={price}>
                    <Heading as="p" size="lg" className={css.price}>
                        {price}
                    </Heading>
                </Tooltip>
            )}
            <Text className={css.date}>
                <Text as="span">{label}:</Text> {date(order.startDate).locale(locale).toNow(true)}
            </Text>
        </>
    );
};

interface OrderInfoProps {
    order: Order;
    label: string;
    locale?: Record<string, string>;
}
export const OrderInfo: FC<OrderInfoProps> = ({ label, order, locale }) => {
    return (
        <>
            <Heading className={css.info}>{label}</Heading>
            <StatusBadge status={order.status} locale={locale} type="text" />
        </>
    );
};

interface OrderCardProps {
    children?: ReactNode;
    options?: ReactNode;
    order: Order;
    locale?: string;
}
export const OrderCard: FC<OrderCardProps> = ({ children, options, order, locale = 'en-US' }) => {
    const currency = useCurrency();

    return (
        <div className={classNames(css.root, children && css.children)}>
            <Flex className={css.wrapper} align="flex-start" justify="space-between">
                <div className={css.width}>{children}</div>
                {options}
            </Flex>

            <div className={css.offer}>
                <Image className={css.img} src={order.images[0]} alt={order.title} />

                <div className={css.container}>
                    <Text as="h3" size="sm" weight={500} className={css.title}>
                        {order.title}
                    </Text>

                    <Flex align="center" className={classNames(css.price, { [css.sale]: Boolean(order.sale) })}>
                        <Heading as="span" size="sm">
                            {currency.format(order.price, locale)}
                        </Heading>
                        {order.sale?.percentage ? (
                            <Text as="span" size="xs" weight={500} className={css.discount}>
                                Sale: {order.sale.percentage}%
                            </Text>
                        ) : null}
                    </Flex>
                </div>
            </div>
        </div>
    );
};
