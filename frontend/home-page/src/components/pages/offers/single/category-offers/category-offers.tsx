import { FC } from 'react';

import { ChevronRightIcon, Container, Flex, Heading } from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { OffersCardList } from '@app/components/offers-card-list/offers-card-list';
import { useCategoryOffersContext } from '@app/context/offers/category-offers.context';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './category-offers.module.scss';

export const CategoryOffers: FC = () => {
    const { t } = useTranslation();

    const { offer } = useSingleOfferContext();
    const offers = useCategoryOffersContext();

    return (
        <>
            {offers.totalItems ? (
                <section className={css.root}>
                    <Container size="md">
                        <Flex justify="space-between" align="center" className={css.header}>
                            <Heading as="h2" size="md">
                                {t('Offers of the same category')}
                            </Heading>

                            <Link
                                size="sm"
                                variant="ghost"
                                href={routes.search({ category: offer.category.slug })}
                                rightIcon={<ChevronRightIcon />}
                            >
                                {t('View all')}
                            </Link>
                        </Flex>
                        <OffersCardList offers={offers.data} />
                    </Container>
                </section>
            ) : null}
        </>
    );
};
