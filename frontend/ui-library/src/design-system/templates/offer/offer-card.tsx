import { FC } from 'react';

import classNames from 'classnames';
import { Text, Heading } from 'src/design-system/foundation';
import { Flex } from 'src/design-system/layout';
import { Image } from 'src/design-system/media/image/image';
import { useCurrency } from 'src/hooks/currency.hook';
import { OfferCardType } from 'src/types/offers.type';

import css from './offer-card.module.scss';

export interface OfferCardProps {
    offer: OfferCardType;
    locale?: string;
}
export const OfferCard: FC<OfferCardProps> = ({ offer, locale = 'en-US' }) => {
    const currency = useCurrency();

    return (
        <div className={css.root}>
            <Image className={css.img} src={offer.image} alt={offer.title} />
            {offer.sale ? (
                <Heading as="span" size="sm" weight={700} className={css.discount}>
                    Sale: {offer.sale}%
                </Heading>
            ) : null}

            <div className={css.container}>
                <Text as="h3" size="sm" weight={500} className={css.title}>
                    {offer.title}
                </Text>
                <Text size="sm" className={css.category}>
                    {offer.category}
                </Text>

                <Flex align="center" className={classNames(css.price, { [css.sale]: Boolean(offer.sale) })}>
                    <Heading as="span" size="sm" weight={700}>
                        {currency.format(offer.price, locale)}
                    </Heading>
                </Flex>
            </div>
        </div>
    );
};
