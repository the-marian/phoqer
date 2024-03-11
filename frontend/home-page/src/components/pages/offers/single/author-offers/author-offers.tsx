import { FC } from 'react';

import { ChevronRightIcon, Container, Flex, Heading } from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { SmallOffersCardList } from '@app/components/small-offers-card-list/small-offers-card-list';
import { useAuthorOffersContext } from '@app/context/offers/author-offers.context';
import { useSingleOfferContext } from '@app/context/offers/single-offer.context';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import css from './author-offers.module.scss';

export const AuthorOffers: FC = () => {
    const { t } = useTranslation();

    const offers = useAuthorOffersContext();
    const { offer } = useSingleOfferContext();

    return (
        <>
            {offers.totalItems ? (
                <section className={css.root}>
                    <Container size="md">
                        <Flex justify="space-between" align="center" className={css.header}>
                            <Heading as="h2" size="md">
                                {t('Other offers by this author')}
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

                        <SmallOffersCardList offers={offers.data} />
                    </Container>
                </section>
            ) : null}
        </>
    );
};
