import { FC } from 'react';

import { Card, CardBody, Heading, Image, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { SlideInView, PriceTag, AppLink } from 'common';
import { OfferCard as OfferCardType } from 'query';

interface Props {
    data: OfferCardType;
}
export const OfferCard: FC<Props> = ({ data }) => {
    return (
        <Card
            as={AppLink}
            variant="outline"
            borderRadius="0.9rem"
            href={`/offers/${data.id}`}
            _hover={{
                boxShadow: useColorModeValue(
                    '0 0 0 1px var(--chakra-colors-gray-800)',
                    '0 0 0 1px var(--chakra-colors-gray-500)',
                ),
            }}
        >
            <SlideInView>
                <CardBody p={2}>
                    <Image h="200px" w="100%" src={data.image} alt={data.title} borderRadius="0.7rem" objectFit="cover" />

                    <PriceTag price={data.price} sale={data.sale} position="absolute" top={4} left={4} borderRadius="lg" />

                    <Stack p={3} spacing={0.5}>
                        <Heading size="sm" isTruncated>
                            {data.title}
                        </Heading>
                        <Text color="text.secondary">{data.category}</Text>
                    </Stack>
                </CardBody>
            </SlideInView>
        </Card>
    );
};
