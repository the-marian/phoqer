import React from 'react';

import { Order } from 'phoqer';

import { cellMap } from 'src/pages/orders/shared/order-details/utils';

import { TableCell } from './table-cell/table-cell';
import css from './table.module.scss';

interface Props {
    order: Order;
}
export const Table = ({ order }: Props): JSX.Element => {
    return (
        <table className={css.table}>
            <tbody>
                {cellMap.map(item => (
                    <tr key={item.key}>
                        <td>{item.title}</td>
                        <TableCell row={order} cell={item.key} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
