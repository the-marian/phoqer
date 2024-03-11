import { FC } from 'react';

import { Table, THead, TBody, Tr, Th, Button } from 'phoqer';
import { StickyContainer } from 'phoqer-shared';

import { EmptyState } from '@app/components/pages/favorite/shared/empty-state/empty-state';
import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './table-body.module.scss';
import { TableCell } from './table-cell/table-cell';
import { TableSkeleton } from './table-skeleton/table-skeleton';
import { headerOrder, sizeMap } from './utils';

export const TableBody: FC = () => {
    const { t } = useTranslation();
    const { favorite, loading, loadMore } = useFavoriteContext();

    if (!loading && !favorite.data.length) {
        return <EmptyState />;
    }

    return (
        <>
            <Table className={css.table}>
                <THead>
                    <Tr>
                        {headerOrder.map(th => (
                            <Th size={sizeMap[th.key]} key={th.key}>
                                {t(th.title)}
                            </Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        favorite.data.map(row => {
                            return (
                                <Tr key={row.id + 'row'}>
                                    {headerOrder.map(cell => (
                                        <TableCell row={row} cell={cell.key} key={row.id + cell.key} />
                                    ))}
                                </Tr>
                            );
                        })
                    )}
                </TBody>
            </Table>

            {favorite.currentPage < favorite.totalPages && (
                <StickyContainer zIndex={0}>
                    <div className={css.center}>
                        <Button size="sm" variant="secondary" isLoading={loading} onClick={loadMore}>
                            {t('Load more items')}
                        </Button>
                    </div>
                </StickyContainer>
            )}
        </>
    );
};
