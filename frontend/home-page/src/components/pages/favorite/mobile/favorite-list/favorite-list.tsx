import { FC, useState } from 'react';

import { Container, CardLoader, Card, ID, Button, Flex } from 'phoqer';

import { FavoriteDetails } from '@app/components/pages/favorite/mobile/favorite-details/favorite-details';
import { EmptyState } from '@app/components/pages/favorite/shared/empty-state/empty-state';
import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './favorite-list.module.scss';

export const FavoriteList: FC = () => {
    const { t, locale } = useTranslation();
    const { loading, favorite, loadMore } = useFavoriteContext();
    const [activeOrder, setActiveOrder] = useState<ID | null>(null);

    return (
        <Container className={css.mt}>
            {loading ? (
                <CardLoader />
            ) : favorite.data.length ? (
                favorite.data.map(order => (
                    <Card
                        key={order.id}
                        value={order}
                        locale={locale}
                        isActive={activeOrder === order.id}
                        onClick={() => setActiveOrder(activeOrder === order.id ? null : order.id)}
                    >
                        <FavoriteDetails favorite={order} />
                    </Card>
                ))
            ) : (
                <EmptyState />
            )}

            {favorite.currentPage < favorite.totalPages && (
                <Flex align="center" justify="center" className={css.mt}>
                    <Button variant="secondary" isLoading={loading} onClick={loadMore}>
                        {t('Load more items')}
                    </Button>
                </Flex>
            )}
        </Container>
    );
};
