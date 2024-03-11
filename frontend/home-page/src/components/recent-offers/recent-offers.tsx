import { FC, useEffect, useState } from 'react';

import { Flex, OfferCardType, Heading } from 'phoqer';

import { SmallOffersCardList } from '@app/components/small-offers-card-list/small-offers-card-list';
import { useGetRecentOffers } from '@app/hook/recent-offers.hook';
import { useTranslation } from '@app/hook/translations.hook';

import css from './recent-offers.module.scss';

export const RecentOffers: FC = () => {
    const { t } = useTranslation();

    const getRecentOffers = useGetRecentOffers();
    const [offers, setOffers] = useState<OfferCardType[]>([]);

    useEffect(() => {
        const storedData = getRecentOffers();
        if (storedData.length) {
            setOffers(storedData);
        }
    }, [getRecentOffers]);

    return (
        <>
            {offers.length ? (
                <>
                    <section className={css.root}>
                        <Flex align="center" className={css.header}>
                            <Heading as="h2" size="md">
                                {t('Recently viewed offers')}
                            </Heading>
                        </Flex>

                        <SmallOffersCardList offers={offers} />
                    </section>
                </>
            ) : null}
        </>
    );
};
