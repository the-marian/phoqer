import React from 'react';

import { Td, Tr, Skeleton, TableCellSizeEnum } from 'phoqer';

import { headerOrder, sizeMap } from 'src/pages/orders/desktop/table-body/utils';

import css from './orders-skeleton.module.scss';

export const OrdersSkeleton = (): JSX.Element => {
    return (
        <>
            {[...Array(10)].map((_, index) => (
                <Tr key={index + 'row'}>
                    <Td className={css.loadingTd} key={'checkbox ' + index} size={TableCellSizeEnum.Small}>
                        <Skeleton color="dark" style={{ width: '100%', height: '0.6rem' }} />
                    </Td>

                    {headerOrder.map(cell => (
                        <Td className={css.loadingTd} key={index + 'row' + cell.key} size={sizeMap[cell.key]}>
                            <Skeleton color="dark" style={{ width: '100%', height: '0.6rem' }} />
                        </Td>
                    ))}
                </Tr>
            ))}
        </>
    );
};
