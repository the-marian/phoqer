import React from 'react';

import { Td, Tr, Skeleton, TableCellSizeEnum } from 'phoqer';

import css from './table-skeleton.module.scss';

interface Props {
    headerOrder: Record<'key' | 'title', string>[];
    sizeMap: Record<string, TableCellSizeEnum>;
}
export const TableSkeleton = ({ headerOrder, sizeMap }: Props): JSX.Element => {
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
