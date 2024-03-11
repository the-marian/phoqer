import React from 'react';

import { useCurrency, useDate, Order } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { Status } from 'src/components/status/status';

interface TableCellProps {
    cell: string;
    row: Order;
}
export const TableCell = ({ cell, row }: TableCellProps): JSX.Element => {
    const date = useDate();
    const { i18n } = useTranslation();
    const currency = useCurrency();

    switch (cell) {
        case 'expired':
            return (
                <td>
                    {row.expired
                        ? date(Number(row.expired) * 1000)
                              .locale(i18n.language)
                              .format('LLL')
                        : '-'}
                </td>
            );

        case 'date':
            return (
                <td>
                    {date(Number(row.date) * 1000)
                        .locale(i18n.language)
                        .format('LLL')}
                </td>
            );

        case 'status':
            return (
                <td>
                    <Status status={row.status} type="text" />
                </td>
            );

        case 'category':
            return <td>{row.category.title}</td>;

        case 'price':
            return <td>{currency.format(row.price, i18n.language)}</td>;

        case 'sale_description':
            return <td>{row.sale?.description || '-'}</td>;

        case 'sale':
            return <td>{(row.sale?.percentage || '0') + '%'}</td>;

        default:
            return <td>{(row[cell as keyof Order] as string) || '-'}</td>;
    }
};
