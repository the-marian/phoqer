import React, { lazy, Suspense, useEffect, useState } from 'react';

import {
    Table,
    THead,
    TBody,
    Tr,
    Th,
    Td,
    Checkbox,
    Tooltip,
    Button,
    TableCellSizeEnum,
    Loader,
    useTableContext,
    Order,
} from 'phoqer';
import { useReduceAnimations, useOrdersContext, StickyContainer } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { headerOrder, sizeMap } from 'src/pages/orders/desktop/table-body/utils';
import { EmptyState } from 'src/pages/orders/shared/empty-state/empty-state';

import { OrdersSkeleton } from './orders-skeleton/orders-skeleton';
import css from './table-body.module.scss';
import { TableCell } from './table-cell/table-cell';

const DetailsModal = lazy(() => import('./order-modal/order-modal' /** DetailsModal */));

export const TableBody = (): JSX.Element => {
    const { t } = useTranslation();

    const { isReduceAnimations } = useReduceAnimations();
    const { orders, loading, loadMore } = useOrdersContext();
    const { selected, eventToggle, toggle, selectAll, unselectAll, onFocus, onBlur, setData } = useTableContext();

    useEffect(() => {
        setData(orders.data);
    }, [setData, orders.data]);

    const isAllSelected = selected.length === orders.data.length;
    const handleBulk = isAllSelected ? unselectAll : selectAll;

    const [selectedRow, setSelectedRow] = useState<Order | null>(null);
    const handleClose = (): void => {
        setSelectedRow(null);
        onFocus();
    };

    const handleAllCheckbox = (event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
            handleBulk();
        }
    };

    const handleCheckbox = (index: number) => {
        return (event: React.KeyboardEvent): void => {
            if (event.key === 'Enter') {
                toggle(index)();
            }
        };
    };

    return (
        <>
            {!loading && !orders.data.length ? (
                <EmptyState />
            ) : (
                <Table className={css.table} onFocus={onFocus} onBlur={onBlur}>
                    <THead>
                        <Tr>
                            <Th size={TableCellSizeEnum.Small}>
                                <Tooltip disabled={isReduceAnimations} label={t('Select all items')}>
                                    <Checkbox checked={isAllSelected} onChange={handleBulk} onKeyPress={handleAllCheckbox} />
                                </Tooltip>
                            </Th>
                            {headerOrder.map(th => (
                                <Th size={sizeMap[th.key]} key={th.key}>
                                    {t(th.title)}
                                </Th>
                            ))}
                        </Tr>
                    </THead>
                    <TBody>
                        {loading ? (
                            <OrdersSkeleton />
                        ) : (
                            orders.data.map((row, index) => {
                                const isActive = selected.includes(index);

                                return (
                                    <Tr key={row.id + 'row'} active={isActive}>
                                        <Td className={css.checkbox} size={TableCellSizeEnum.Small} onClick={eventToggle(index)}>
                                            <Checkbox onKeyPress={handleCheckbox(index)} checked={isActive} />
                                        </Td>

                                        {headerOrder.map(cell => (
                                            <TableCell
                                                row={row}
                                                cell={cell.key}
                                                key={row.id + cell.key}
                                                onPreview={setSelectedRow}
                                            />
                                        ))}
                                    </Tr>
                                );
                            })
                        )}
                    </TBody>
                </Table>
            )}

            <Suspense fallback={<Loader fixed />}>
                <DetailsModal order={selectedRow} onClose={handleClose} />
            </Suspense>

            {orders.currentPage < orders.totalPages && (
                <StickyContainer zIndex={0}>
                    <div className={css.center}>
                        <Button outline loading={loading} onClick={loadMore}>
                            {t('Load more items')}
                        </Button>
                    </div>
                </StickyContainer>
            )}
        </>
    );
};
