import { FC } from 'react';

import { Heading } from 'phoqer';

import { Suggestion } from '@app/components/pages/home/search/suggestion/suggestion';
import { useTranslation } from '@app/hook/translations.hook';

const list = [
    'iPhone',
    'MacBook',
    'iPad',
    'Apple Watch',
    'GoPro Hero',
    'Apple AirPods Pro',
    'VR Oculus',
    'Samsung Galaxy Z Flip3',
    'Samsung Galaxy S22 Ultra',
    'Sony PlayStation 5',
    'Apple AirPods Max',
];

export const TopSearch: FC = () => {
    const { t } = useTranslation();

    return (
        <Suggestion
            list={list}
            title={
                <Heading as="h2" size="md">
                    {t('Top search')}
                </Heading>
            }
        />
    );
};
