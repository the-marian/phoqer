import React from 'react';

import { TImages, useCurrency, Td, stripHTML, Offer } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { Status } from 'src/components/status/status';
import { sizeMap } from 'src/pages/offers/desktop/table-body/utils';

import { TableDropdown } from './table-dropdown/table-dropdown';

interface Props {
    row: Offer;
    cell: string;
    onClick: (row: Offer) => void;
}

export const TableCell = ({ row, cell, onClick }: Props): JSX.Element => {
    const { i18n } = useTranslation();
    const currency = useCurrency();
    const { isReduceAnimations } = useReduceAnimations();

    const handleClick = (): void => onClick(row);

    switch (cell) {
        case 'status': {
            return (
                <Td size={sizeMap[cell]}>
                    <Status status={row.status} type="icon" />
                </Td>
            );
        }

        case 'options': {
            return (
                <Td size={sizeMap[cell]}>
                    <TableDropdown offer={row} />
                </Td>
            );
        }

        case 'images': {
            return <TImages media={row[cell]} onClick={handleClick} />;
        }

        case 'price': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handleClick}>
                    {currency.format(row.price, i18n.language) || ''}
                </Td>
            );
        }

        case 'title': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handleClick}>
                    {row.title || ''}
                </Td>
            );
        }

        case 'category': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handleClick}>
                    {row.category.title || ''}
                </Td>
            );
        }

        case 'sale_percentage': {
            return (
                <Td size={sizeMap[cell]} onClick={handleClick}>
                    {row.sale?.percentage ? row.sale?.percentage + '%' : '-'}
                </Td>
            );
        }

        case 'sale_description': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handleClick}>
                    {row.sale?.description || ''}
                </Td>
            );
        }

        case 'description': {
            return (
                <Td size={sizeMap[cell]} overflow onClick={handleClick}>
                    {stripHTML(row.description)}
                </Td>
            );
        }

        default: {
            return (
                <Td
                    overflow
                    size={sizeMap[cell]}
                    onClick={handleClick}
                    tooltip={Boolean(!isReduceAnimations && row[cell as keyof Offer])}
                >
                    {(row[cell as keyof Offer] as string) ?? ' - '}
                </Td>
            );
        }
    }
};
