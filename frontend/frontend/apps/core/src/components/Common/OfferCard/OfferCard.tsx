import { FC } from 'react';

import { Card, Image, CardBody, Heading, HStack, Stack, Text, Tooltip, useColorModeValue, Box } from '@chakra-ui/react';
import { PriceTag } from 'common';
import Link from 'next/link';
import { OfferCard as OfferCardType } from 'query';

interface Props {
    data: OfferCardType;
}
export const OfferCard: FC<Props> = ({ data }) => {
    return (
        <Card
            size="sm"
            as={Link}
            variant="outline"
            borderRadius="1rem"
            bg="transparent"
            href={`/offers/${data.id}`}
            borderColor={useColorModeValue('gray.400', 'gray.700')}
            _hover={{ borderColor: 'gray.600' }}
        >
            <CardBody as={HStack} spacing={4} borderRadius="lg">
                <Image
                    h={16}
                    w={16}
                    objectFit="cover"
                    src={data.image}
                    alt={data.title}
                    borderRadius="lg"
                    fallback={<Box h={16} w={16} borderRadius="lg" bg="gray.300" />}
                />

                <Tooltip label={data.title} placement="top">
                    <Stack spacing={1} flex={1}>
                        <Text size="sm" color="text.secondary">
                            {data.category}
                        </Text>
                        <Heading size="xs" noOfLines={2} wordBreak="break-all">
                            {data.title}
                        </Heading>
                    </Stack>
                </Tooltip>

                <PriceTag sale={data.sale} price={data.price} />
            </CardBody>
        </Card>
    );
};
