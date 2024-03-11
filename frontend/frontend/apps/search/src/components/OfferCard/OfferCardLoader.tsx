import { FC } from 'react';

import { Card, CardBody, Stack, Skeleton } from '@chakra-ui/react';

export const OfferCardLoader: FC = () => {
    return (
        <Card variant="outline" borderRadius="0.9rem">
            <CardBody p={2}>
                <Skeleton h="200px" w="100%" borderRadius="0.7rem" />

                <Stack p={3} spacing={0.5}>
                    <Skeleton h={5} w="70%" />
                    <Skeleton h={4} w="40%" />
                </Stack>
            </CardBody>
        </Card>
    );
};
