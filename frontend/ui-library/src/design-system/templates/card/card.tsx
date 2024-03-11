import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { StatusBadge } from 'src/design-system/data-display/status-badge/status-badge';
import { Collapse } from 'src/design-system/disclosure/collapse/collapse';
import { Text, Heading } from 'src/design-system/foundation';
import { ChevronRightIcon } from 'src/design-system/icons';
import { Flex } from 'src/design-system/layout';
import { Image } from 'src/design-system/media/image/image';
import { useCurrency } from 'src/hooks/currency.hook';
import { ICategory } from 'src/types/categories.type';
import { Offer, OfferCardType, OfferItemType, SaleType } from 'src/types/offers.type';
import { Order } from 'src/types/orders.type';

import css from './card.module.scss';

export interface CardProps {
    isActive: boolean;
    onClick: () => void;
    locale?: string;
    statusLocale?: Record<string, string>;
    children: ReactNode;
    value: OfferCardType | OfferItemType | Order | Offer;
}
export const Card: FC<CardProps> = ({ children, value, isActive, onClick, locale, statusLocale }) => {
    const currency = useCurrency();

    const sale = typeof value.sale === 'object' ? (value.sale as SaleType)?.percentage : value.sale;
    const category = typeof value.category === 'object' ? (value.category as ICategory).title : value.category;

    return (
        <div className={classNames(css.root, isActive && css.active)}>
            <button type="button" className={css.button} onClick={onClick}>
                <Flex align="center" justify="space-between" wrap="nowrap" className={css.inner}>
                    <Image
                        alt={value.title}
                        className={css.image}
                        src={(value as OfferCardType).image || (value as OfferItemType).images?.[0]}
                    />

                    <Flex align="flex-start" justify="space-between" direction="column" className={css.content}>
                        <Heading as="h3" size="sm" className={css.title}>
                            {value.title}
                        </Heading>

                        <Flex align="center">
                            {(value as Order).status && (
                                <div className={css.status}>
                                    <StatusBadge type="icon" locale={statusLocale} status={(value as Order).status} />
                                </div>
                            )}
                            <Text size="sm" className={css.category}>
                                {category}
                            </Text>
                        </Flex>

                        <Flex align="center" justify="flex-start" className={css.footer}>
                            <Flex align="center">
                                <Heading weight={700} size="sm" className={classNames(sale && css.price)}>
                                    {currency.format(value.price, locale)}
                                </Heading>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex align="center" justify="center" className={css.marker}>
                        <ChevronRightIcon />
                    </Flex>
                </Flex>
            </button>

            <Collapse isOpen={isActive}>
                <div className={css.children}>{children}</div>
            </Collapse>
        </div>
    );
};
