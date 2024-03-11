import { FC } from 'react';

import { Stack, Switch, Text } from '@chakra-ui/react';
import { omitBy } from 'lodash-es';
import { useSearchParams } from 'react-router-dom';

export const General: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isTop = (searchParams.get('isTop') ?? '') === 'true';
    const isReviews = (searchParams.get('isReviews') ?? '') === 'true';
    const isSale = (searchParams.get('isSale') ?? '') === 'true';

    const handleChange = (key: string) => {
        setSearchParams(prev => {
            const params = Object.fromEntries(Array.from(prev));
            return omitBy({ ...params, [key]: !params[key] }, value => !value) as Record<string, string>;
        });
    };

    return (
        <Stack spacing={4}>
            <Switch
                isChecked={isTop}
                onChange={() => handleChange('isTop')}
                size="lg"
                cursor="pointer"
                display="flex"
                _checked={{
                    _dark: {
                        '.chakra-switch__track': {
                            bg: 'blue.600',
                        },
                    },
                }}
            >
                <Text noOfLines={1}>Only TOP offers</Text>
            </Switch>
            <Switch
                isChecked={isReviews}
                onChange={() => handleChange('isReviews')}
                size="lg"
                cursor="pointer"
                display="flex"
                _checked={{
                    _dark: {
                        '.chakra-switch__track': {
                            bg: 'blue.600',
                        },
                    },
                }}
            >
                <Text noOfLines={1}>Only offers with reviews</Text>
            </Switch>
            <Switch
                isChecked={isSale}
                onChange={() => handleChange('isSale')}
                size="lg"
                cursor="pointer"
                display="flex"
                _checked={{
                    _dark: {
                        '.chakra-switch__track': {
                            bg: 'blue.600',
                        },
                    },
                }}
            >
                <Text noOfLines={1}>Offers with sale</Text>
            </Switch>
        </Stack>
    );
};
