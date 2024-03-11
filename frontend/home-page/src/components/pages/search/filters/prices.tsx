import { FC, useState } from 'react';

import { useRouter } from 'next/router';
import { Checkbox } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';
import { queryParams } from '@app/utils/query-params';

const checkboxArray = [
    { minPrice: undefined, maxPrice: undefined, text: 'All prices' },
    { minPrice: '0', maxPrice: '50', text: 'from 0$ to 50$' },
    { minPrice: '50', maxPrice: '150', text: 'from 50$ to 150$' },
    { minPrice: '150', maxPrice: '200', text: 'from 150$ to 200$' },
    { minPrice: '200', maxPrice: '300', text: 'from 200$ to 300$' },
    { minPrice: '300', maxPrice: '400', text: 'from 300$ to 400$' },
    { minPrice: '400', maxPrice: '500', text: 'from 400$ to 500$' },
    { minPrice: '500', maxPrice: undefined, text: 'from 500$' },
];

export const Prices: FC = () => {
    const { t } = useTranslation();
    const { query, push, pathname } = useRouter();

    const [minPrice, setMinPrice] = useState(query.minPrice ?? '');
    const [maxPrice, setMaxPrice] = useState(query.maxPrice ?? '');

    const handleCheckboxChange = (min?: string, max?: string) => () => {
        push(pathname + '?' + queryParams({ ...query, minPrice: min, maxPrice: max }), undefined, { scroll: false });
    };

    return (
        <>
            {checkboxArray.map(item => (
                <Checkbox
                    size="sm"
                    key={item.text}
                    label={t(item.text)}
                    onChange={handleCheckboxChange(item.minPrice, item.maxPrice)}
                    checked={query.minPrice === item.minPrice && query.maxPrice === item.maxPrice}
                />
            ))}
        </>
    );
};
