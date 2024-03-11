import { FC } from 'react';

import { Tag, Tooltip, TagProps } from '@chakra-ui/react';

import { useCurrency } from '../hook';

interface Props extends TagProps {
    sale?: number | null;
    price: number;
}
export const PriceTag: FC<Props> = ({ sale, price, ...props }: Props) => {
    const currency = useCurrency();

    return (
        <Tooltip label={sale ? `Sales: ${sale}%` : undefined} placement="top">
            <Tag size="md" variant={sale ? 'success' : 'secondary'} {...props}>
                {currency.format(price)}
            </Tag>
        </Tooltip>
    );
};
