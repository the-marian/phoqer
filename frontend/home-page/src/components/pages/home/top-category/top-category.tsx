import { FC, useEffect, useState } from 'react';

import { ChevronRightIcon, Container, Flex, ICategory, Intersection, OfferListType, Heading } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { Link } from '@app/components/common/link/link';
import css from '@app/components/pages/home/top-offers/top-offers.module.scss';
import { SmallOffersCardList } from '@app/components/small-offers-card-list/small-offers-card-list';
import { UiPagination } from '@app/config/ui.config';
import { useTranslation } from '@app/hook/translations.hook';
import { offersService } from '@app/services/offers.service';
import { routes } from '@app/utils/routes';

interface TopCategoryInnerProps {
    isOpen: boolean;
    category: ICategory;
}
const TopCategoryInner: FC<TopCategoryInnerProps> = ({ category, isOpen }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [offers, setOffers] = useState<OfferListType>(getEmptyPagination());

    useEffect(() => {
        if (isOpen) {
            offersService
                .category(category.slug, UiPagination.SM + 2)
                .then(setOffers)
                .finally(() => setIsLoading(false));
        }
    }, [category.slug, isOpen]);

    return (
        <section className={css.root}>
            <Container size="md">
                <Flex align="center" justify="space-between" className={css.header}>
                    <Heading as="h2" size="md">
                        {category.title}
                    </Heading>

                    <Link
                        size="sm"
                        variant="ghost"
                        href={routes.search({ category: category.slug })}
                        rightIcon={<ChevronRightIcon />}
                    >
                        {t('View all')}
                    </Link>
                </Flex>

                <SmallOffersCardList offers={offers.data} loading={isLoading} />
            </Container>
        </section>
    );
};

interface TopCategoryProps {
    category: ICategory;
}
export const TopCategory: FC<TopCategoryProps> = ({ category }) => {
    return <Intersection once>{intersected => <TopCategoryInner category={category} isOpen={intersected} />}</Intersection>;
};
