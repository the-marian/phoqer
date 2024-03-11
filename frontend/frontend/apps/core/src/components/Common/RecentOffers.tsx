import { FC } from 'react';

import { OfferCard } from '@app/components/Common';
import { useGetRecentOffers } from '@app/hook';
import { Button, Container, Grid, GridItem, Heading, HStack, Stack } from '@chakra-ui/react';
import { SlideInView } from 'common';
import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

export const RecentOffers: FC = () => {
    const ofers = useGetRecentOffers();

    if (!ofers.length) return <></>;

    return (
        <Container as="section" size="lg">
            <Stack spacing={4}>
                <HStack justifyContent="space-between" alignItems="flex-end">
                    <Heading size="md">Recently viewed offers</Heading>

                    <HStack spacing={4}>
                        <Button size="sm" variant="secondary" as={Link} href="/search" rightIcon={<MdArrowForward />}>
                            View more
                        </Button>
                    </HStack>
                </HStack>

                <Grid gridGap={4} gridTemplateColumns={{ base: 'repeat(2, 1fr)' }}>
                    {ofers?.map(offer => (
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
