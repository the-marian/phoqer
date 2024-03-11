import { FC } from 'react';

import { ChevronRightIcon, Container, Flex, OfferCardType, Heading } from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { OffersCardList } from '@app/components/offers-card-list/offers-card-list';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './top-offers.module.scss';

interface Props {
    offers: OfferCardType[];
}
export const TopOffers: FC<Props> = ({ offers }) => {
    const { t } = useTranslation();

    return (
        <section className={css.root}>
            <Container size="md">
                <Flex align="center" justify="space-between" className={css.header}>
                    <Heading as="h2" size="md">
                        {t('Top offers')}
                    </Heading>

                    <Link href={routes.search()} rightIcon={<ChevronRightIcon />} size="sm" variant="ghost">
                        {t('View all')}
                    </Link>
                </Flex>
                <OffersCardList offers={offers} />
            </Container>
        </section>
    );
};
