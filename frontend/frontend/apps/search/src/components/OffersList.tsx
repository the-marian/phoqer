import { FC, useMemo } from 'react';

import { Grid, useColorModeValue } from '@chakra-ui/react';
import { range } from 'lodash-es';
import { useSearchOffers } from 'query';
import { useSearchParams } from 'react-router-dom';

import { OfferCard, OfferCardLoader } from './OfferCard';

const skeletonList = range(10);

export const OffersList: FC = () => {
    const [searchParams] = useSearchParams();
    const params = useMemo(() => Object.fromEntries(Array.from(searchParams)), [searchParams]);

    const { data, isLoading, isFetching } = useSearchOffers(params);

    return (
        <Grid
            p={8}
            h="100%"
            gridRowGap={6}
            gridColumnGap={4}
            borderRadius="1rem"
            opacity={isFetching ? 0.5 : 1}
            bg={useColorModeValue('gray.100', 'gray.900')}
            gridTemplateColumns="repeat(4, 1fr)"
            gridTemplateRows="repeat(auto-fill, 284px)"
        >
            {isLoading
                ? skeletonList.map(item => <OfferCardLoader key={item} />)
                : data?.data?.map(item => <OfferCard key={item.id} data={item} />)}
        </Grid>
    );
};
