import { FC } from 'react';

import { OfferCard } from '@app/components/Common';
import { Button, Container, Grid, GridItem, Heading, HStack, Stack } from '@chakra-ui/react';
import { SlideInView } from 'common';
import Link from 'next/link';
import { OfferCard as OfferCardType } from 'query';
import { MdArrowForward } from 'react-icons/md';

interface Props {
    data: OfferCardType[];
}
export const TopOffers: FC<Props> = ({ data }) => {
    return (
        <Container as="section" size="lg">
            <Stack spacing={4}>
                <HStack justifyContent="space-between" alignItems="flex-end">
                    <Heading size="md">Top offers</Heading>

                    <HStack spacing={4}>
                        <Button size="sm" variant="secondary" as={Link} href="/search" rightIcon={<MdArrowForward />}>
                            View more
                        </Button>
                    </HStack>
                </HStack>

                <Grid gridGap={4} gridTemplateColumns={{ base: 'repeat(2, 1fr)' }}>
                    {data?.map(offer => (
                        <GridItem key={offer.id}>
                            <SlideInView>
                                <OfferCard data={offer} />
                            </SlideInView>
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
        </Container>
    );
};
