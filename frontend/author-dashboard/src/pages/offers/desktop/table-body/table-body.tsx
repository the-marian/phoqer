import React, { useEffect, useState } from 'react';

import { Table, THead, TBody, Tr, Th, Td, Checkbox, Tooltip, Button, TableCellSizeEnum, useTableContext, Offer } from 'phoqer';
import { useReduceAnimations, useOffersContext, StickyContainer } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { EmptyState } from 'src/components/empty-state/empty-state';
import { TableSkeleton } from 'src/components/table-skeleton/table-skeleton';
import { OfferDrawer } from 'src/pages/offers/desktop/table-body/offer-drawer/offer-drawer';

import css from './table-body.module.scss';
import { TableCell } from './table-cell/table-cell';
import { headerOrder, sizeMap } from './utils';

export const TableBody = (): JSX.Element => {
    const { t } = useTranslation();

    const { isReduceAnimations } = useReduceAnimations();
    const { offers, loading, loadMore, currentPage, setCurrentPage } = useOffersContext();
    const { selected, eventToggle, toggle, selectAll, unselectAll, onFocus, onBlur, setData } = useTableContext();

    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const unselectOffer = (): void => setSelectedOffer(null);

    useEffect(() => {
        setData(offers.data);
    }, [setData, offers.data]);

    const isAllSelected = selected.length === offers.data.length;
    const handleBulk = isAllSelected ? unselectAll : selectAll;

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
            {!loading && !offers.data.length ? (
                <EmptyState currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
                            <TableSkeleton headerOrder={headerOrder} sizeMap={sizeMap} />
                        ) : (
                            offers.data.map((row, index) => {
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
                                                onClick={setSelectedOffer}
                                            />
                                        ))}
                                    </Tr>
                                );
                            })
                        )}
                    </TBody>
                </Table>
            )}

            <OfferDrawer offer={selectedOffer} onClose={unselectOffer} />

            {offers.currentPage < offers.totalPages && (
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
