import { FC } from 'react';

import { Card, CardBody, HStack, useColorModeValue, Skeleton } from '@chakra-ui/react';

export const OfferCardLoader: FC = () => {
    return (
        <Card
            size="sm"
            variant="outline"
            borderRadius="1rem"
            bg="transparent"
            borderColor={useColorModeValue('gray.400', 'gray.700')}
        >
            <CardBody as={HStack} spacing={4} borderRadius="lg" justifyContent="space-between">
                <Skeleton h={20} maxW="25rem" flex={1} borderRadius="lg" />
                <Skeleton h={8} w={28} borderRadius="lg" />
            </CardBody>
        </Card>
    );
};
