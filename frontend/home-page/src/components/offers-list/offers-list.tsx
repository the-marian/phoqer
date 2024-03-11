import { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { EmptyState, Image, OfferListType, Option, Text, Heading, useCurrency, Flex } from 'phoqer';

import { Link } from '@app/components/common/link/link';
import { useTranslation } from '@app/hook/translations.hook';
import { routes } from '@app/utils/routes';

import { OffersListSkeleton } from './offers-list-skeleton';
import css from './offers-list.module.scss';

interface Props {
    loading: boolean;
    offers: OfferListType;
    navigate: (value?: string) => void;
    children?: ReactNode;
}

export const OffersList: FC<Props> = ({ offers, loading, navigate, children }) => {
    const { t, locale } = useTranslation();
    const currency = useCurrency();

    if (loading) {
        return <OffersListSkeleton />;
    }

    if (!offers?.data?.length) {
        return (
            <EmptyState type="search">
                <Heading as="h2">{t("You don't have any offers in the favorite")}</Heading>
                <div className="footer">
                    <Link variant="secondary" href={routes.categories.list}>
                        {t('Search offers')}
                    </Link>
                </div>
            </EmptyState>
        );
    }

    return (
        <>
            {offers.data.map(offer => (
                <Option key={offer.id} onClick={() => navigate(routes.offers.single(offer.id))}>
                    <Flex align="center" justify="space-between">
                        <div className={css.imageContainer}>
                            <Image className={css.image} src={offer.image} alt={offer.title} />
                        </div>

                        <div className={css.content}>
                            <Heading as="h3" size="xs">
                                {offer.title}
                            </Heading>
                            <Text size="xs" className={css.category}>
                                {offer.category}
                            </Text>

                            <div className={css.priceContainer}>
                                <Text size="xs" weight={500} className={classNames(offer.sale && css.salePrice)}>
                                    {currency.format(offer.price, locale)}
                                </Text>
                                {offer.sale && (
                                    <Text size="xs" className={css.sale}>
                                        {t('Sale: {{sale}}%', { sale: offer.sale })}
                                    </Text>
                                )}
                            </div>
                        </div>
                    </Flex>
                </Option>
            ))}

            {children}
        </>
    );
};
