import { FC } from 'react';

import { OfferCard } from '@app/components/Common';
import { Container, Grid, GridItem, Heading, Stack } from '@chakra-ui/react';
import { SlideInView } from 'common';
import { OfferCard as OfferCardType } from 'query';

interface Props {
    data: OfferCardType[];
}
export const AuthorOffers: FC<Props> = ({ data }) => {
    return (
        <Container as="section" size="lg">
            <Stack spacing={4}>
                <Heading size="md">Other offers by this author</Heading>

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
