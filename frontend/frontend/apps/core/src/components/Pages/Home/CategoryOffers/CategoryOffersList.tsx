import { FC, useRef } from 'react';

import { OffersGrid } from '@app/components/Common/OffersGrid';
import { Box, Heading } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useGetOfferByCategory } from 'query';

interface Props {
    slug: string;
}
export const CategoryOffersList: FC<Props> = ({ slug }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const { data, isLoading, isSuccess, isError } = useGetOfferByCategory(isInView ? slug : null);

    if ((isSuccess && !data?.data?.length) || isError) {
        return (
            <Box bg="gray.200" _dark={{ bg: 'gray.800' }} p={10} borderRadius="lg">
                <Heading as="h3">No offers found</Heading>
            </Box>
        );
    }

    return (
        <Box ref={ref}>
            <OffersGrid isLoading={isLoading || !isInView} data={data?.data ?? []} />
        </Box>
    );
};
