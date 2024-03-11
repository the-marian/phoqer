import { FC } from 'react';

import { Td, Tr, Skeleton } from 'phoqer';

import { headerOrder, sizeMap } from '@app/components/pages/favorite/desktop/table-body/utils';

import css from './table-skeleton.module.scss';

export const TableSkeleton: FC = () => {
    return (
        <>
            {[...Array(10)].map((_, index) => (
                <Tr key={index + 'row'}>
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
