import { FC } from 'react';

import { Checkbox, Stack } from '@chakra-ui/react';
import { omitBy } from 'lodash-es';
import { useSearchParams } from 'react-router-dom';

const checkboxArray = [
    { minPrice: '', maxPrice: '', text: 'All prices' },
    { minPrice: '0', maxPrice: '50', text: 'From 0$ to 50$' },
    { minPrice: '50', maxPrice: '150', text: 'From 50$ to 150$' },
    { minPrice: '150', maxPrice: '200', text: 'From 150$ to 200$' },
    { minPrice: '200', maxPrice: '300', text: 'From 200$ to 300$' },
    { minPrice: '300', maxPrice: '400', text: 'From 300$ to 400$' },
    { minPrice: '400', maxPrice: '500', text: 'From 400$ to 500$' },
    { minPrice: '500', maxPrice: '', text: 'From 500$' },
];

export const PriceFilter: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const minPrice = searchParams.get('minPrice') ?? '';
    const maxPrice = searchParams.get('maxPrice') ?? '';

    const handleCheckboxChange = (min?: string, max?: string) => {
        setSearchParams(prev => {
            const params = Object.fromEntries(Array.from(prev));
            return omitBy({ ...params, minPrice: min, maxPrice: max }, value => !value) as Record<string, string>;
        });
    };

    return (
        <Stack spacing={4}>
            {checkboxArray.map(item => (
                <Checkbox
                    key={item.text}
                    onChange={() => handleCheckboxChange(item.minPrice, item.maxPrice)}
                    isChecked={minPrice === item.minPrice && maxPrice === item.maxPrice}
                >
                    {item.text}
                </Checkbox>
            ))}
        </Stack>
    );
};
