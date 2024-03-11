import { Meta } from '@storybook/react';
import { Checkbox, Option } from 'src/design-system/inputs';
import { stripHTML } from 'src/helpers/strip-html';
import { useIsOpen } from 'src/hooks';
import { useCurrency } from 'src/hooks/currency.hook';
import { Wrapper } from 'src/storybook/wrapper';
import { Offer } from 'src/types';

import { Table, THead, TBody, Tr, Th, Td, TImages, TDropdown } from './table';
import { TableContextProvider, useTableContext } from './table.context';
import { data, headerOrder, headerTitleMap, sizeMap } from './table.mock';

const meta: Meta<typeof Table> = {
    title: 'Data Display/Table',
    component: Table,
};

export default meta;

const styles = `<style>
.table {
    width: 100%;
    overflow-x: auto;
} 
</style>`;

const TableCell = ({ row, cell }: { row: Offer; cell: string }) => {
    const currency = useCurrency();
    const { isOpen, onClose, onOpen } = useIsOpen();

    switch (cell) {
        case 'details': {
            return (
                <Td size={sizeMap[cell]}>
                    <TDropdown isOpen={isOpen} onClose={onClose} onOpen={onOpen} label="Options">
                        <Option size="sm">Delete</Option>
                        <Option size="sm">Open offer</Option>
                        <Option size="sm">Other</Option>
                    </TDropdown>
                </Td>
            );
        }

        case 'images': {
            return <TImages size={sizeMap[cell]} media={row[cell]} />;
        }

        case 'sale': {
            return (
                <Td size={sizeMap[cell]}>
                    <span className="percentage">{(row.sale?.percentage || '0') + '%'}</span>
                </Td>
            );
        }

        case 'sale_description': {
            return (
                <Td overflow tooltip size={sizeMap[cell]}>
                    {row.sale?.description || '-'}
                </Td>
            );
        }

        case 'description': {
            return (
                <Td overflow size={sizeMap[cell]}>
                    {stripHTML(row.description)}
                </Td>
            );
        }

        case 'category': {
            return <Td size={sizeMap[cell]}>{row.category.title}</Td>;
        }

        case 'price':
            return (
                <Td overflow tooltip size={sizeMap[cell]}>
                    {currency.format(row.price)}
                </Td>
            );

        default:
            return (
                <Td overflow tooltip size={sizeMap[cell]}>
                    {(row[cell as keyof Offer] as string) || ' - '}
                </Td>
            );
    }
};

const Template = () => {
    const { selected, eventToggle, onFocus, onBlur, setData } = useTableContext();
    setData(data);

    return (
        <Wrapper title="Table" styles={styles}>
            <div className="table">
                <Table onFocus={onFocus} onBlur={onBlur}>
                    <THead>
                        <Tr>
                            <Th size={6}>Select</Th>
                            {headerOrder.map(th => (
                                <Th size={sizeMap[th]} key={th}>
                                    {headerTitleMap[th]}
                                </Th>
                            ))}
                        </Tr>
                    </THead>
                    <TBody>
                        {data.map((row, index) => (
                            <Tr key={row.id + 'row'} active={selected.includes(index)}>
                                <Td size={6} onClick={eventToggle(index)}>
                                    <Checkbox size="sm" checked={selected.includes(index)} />
                                </Td>
                                {headerOrder.map(cell => (
                                    <TableCell key={row.id + cell} row={row} cell={cell} />
                                ))}
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
        </Wrapper>
    );
};

export const Base = () => {
    return (
        <TableContextProvider>
            <Template />
        </TableContextProvider>
    );
};
