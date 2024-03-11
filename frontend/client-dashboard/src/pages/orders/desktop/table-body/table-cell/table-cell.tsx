import React, { MouseEvent } from 'react';

import { Avatar, TImages, useCurrency, Td, useDate, Order } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { Status } from 'src/components/status/status';
import { sizeMap } from 'src/pages/orders/desktop/table-body/utils';

import css from './table-cell.module.scss';
import { TableDropdown } from './table-dropdown/table-dropdown';

interface Props {
    row: Order;
    cell: string;
    onPreview: (value: Order) => void;
}

export const TableCell = ({ row, cell, onPreview }: Props): JSX.Element => {
    const date = useDate();
    const currency = useCurrency();
    const { i18n } = useTranslation();
    const { isReduceAnimations } = useReduceAnimations();

    const handlePreview = (): void => onPreview(row);

    const userHref = `/${i18n.language}/users/${row.user.id}`;
    const openLink = (event: MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
        event.preventDefault();

        window.open(userHref);
    };

    switch (cell) {
        case 'status': {
            return (
                <Td size={sizeMap[cell]} onClick={handlePreview}>
                    <Status status={row.status} type="icon" />
                </Td>
            );
        }

        case 'options': {
            return (
                <Td size={sizeMap[cell]}>
                    <TableDropdown order={row} onPreview={handlePreview} />
                </Td>
            );
        }

        case 'images': {
            return <TImages media={row[cell]} onClick={handlePreview} />;
        }

        case 'user': {
            const userName = `${row.user.firstName} ${row.user.lastName}`;
            return (
                <Td size={sizeMap[cell]} className={css.user} onClick={openLink}>
                    <Avatar src={row.user.avatar} alt={userName} className={css.avatar} />
                    <a className={css.link} href={userHref}>
                        {userName}
                    </a>
                </Td>
            );
        }

        case 'price': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handlePreview}>
                    {currency.format(row.price, i18n.language) || ''}
                </Td>
            );
        }

        case 'expired': {
            return (
                <Td size={sizeMap[cell]} onClick={handlePreview}>
                    {row?.expired
                        ? date(Number(row.expired) * 1000)
                              .locale(i18n.language)
                              .format('LLL')
                        : '-'}
                </Td>
            );
        }

        case 'date': {
            return (
                <Td size={sizeMap[cell]} onClick={handlePreview}>
                    {date(Number(row.date) * 1000)
                        .locale(i18n.language)
                        .format('LLL')}
                </Td>
            );
        }

        case 'title': {
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handlePreview}>
                    {row.title}
                </Td>
            );
        }

        case 'address': {
            const address = `${row.country}, ${row.city}, ${row.zip}, ${row.address}`;
            return (
                <Td overflow tooltip={!isReduceAnimations} size={sizeMap[cell]} onClick={handlePreview}>
                    {address}
                </Td>
            );
        }

        case 'comment': {
            return (
                <Td overflow tooltip={Boolean(!isReduceAnimations && row.comment)} size={sizeMap[cell]} onClick={handlePreview}>
                    {row.comment || '-'}
                </Td>
            );
        }

        default: {
            return (
                <Td
                    overflow
                    size={sizeMap[cell]}
                    onClick={handlePreview}
                    tooltip={Boolean(!isReduceAnimations && row[cell as keyof Order])}
                >
                    {(row[cell as keyof Order] as string) ?? '-'}
                </Td>
            );
        }
    }
};
