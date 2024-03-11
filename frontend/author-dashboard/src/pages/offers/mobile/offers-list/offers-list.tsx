import React, { useState } from 'react';

import { Container, CardLoader, Card, ID, Button, Flex } from 'phoqer';
import { StickyContainer, useOffersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { EmptyState } from 'src/components/empty-state/empty-state';
import { useStatusText } from 'src/hook/status-text.hook';
import { OffersAction } from 'src/pages/offers/mobile/offers-action/offers-action';

import css from './offers-list.module.scss';

export const OffersList = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const statusLocale = useStatusText();

    const { loading, offers, currentPage, setCurrentPage, loadMore } = useOffersContext();
    const [activeOffer, setActiveOffer] = useState<ID | null>(null);

    return (
        <Container className={css.mt}>
            {loading ? (
                <CardLoader />
            ) : offers.data.length ? (
                offers.data.map(offer => (
                    <Card
                        key={offer.id}
                        value={offer}
                        locale={i18n.language}
                        statusLocale={statusLocale}
                        isActive={activeOffer === offer.id}
                        onClick={() => setActiveOffer(activeOffer === offer.id ? null : offer.id)}
                    >
                        <OffersAction offer={offer} />
                    </Card>
                ))
            ) : (
                <EmptyState currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}

            {offers.currentPage < offers.totalPages && (
                <Flex align="center" justify="center" className={css.mt}>
                    <Button outline loading={loading} onClick={loadMore}>
                        {t('Load more items')}
                    </Button>
                </Flex>
            )}
        </Container>
    );
};
