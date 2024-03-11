import { FC } from 'react';

import classNames from 'classnames';
import { Text, Heading } from 'src/design-system/foundation';
import { Flex } from 'src/design-system/layout';
import { Image } from 'src/design-system/media/image/image';
import { useCurrency } from 'src/hooks/currency.hook';
import { OfferCardType } from 'src/types/offers.type';

import css from './small-offer.module.scss';

interface Props {
    offer: OfferCardType;
    locale?: string;
}
export const SmallOfferCard: FC<Props> = ({ offer, locale = 'en-US' }) => {
    const currency = useCurrency();

    return (
        <Flex className={classNames(css.root, offer.sale && css.withSale)} justify="space-between" align="center" wrap="nowrap">
            <Image className={css.image} src={offer.image} alt={offer.title} />

            <Flex direction="column" className={css.inner}>
                <Text className={css.title} size="xs" weight={500}>
                    {offer.title}
                </Text>
                <Heading size="xs" className={css.price}>
                    {currency.format(offer.price, locale)}
                </Heading>
            </Flex>

            {offer.sale && (
                <Text size="xs" weight={500} className={css.sale}>
                    {offer.sale}%
                </Text>
            )}
        </Flex>
    );
};
