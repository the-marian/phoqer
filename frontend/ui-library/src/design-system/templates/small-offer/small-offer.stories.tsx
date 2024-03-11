import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import offers from '../offer/offer-card.mock.json';

import { SmallOfferCard } from './small-offer';
import { SmallOfferCardLoader } from './small-offer-loader';

const meta: Meta<typeof SmallOfferCard> = {
    title: 'Templates/SmallOffer',
    component: SmallOfferCard,
};

export default meta;

export const Base = () => (
    <Wrapper title="Small Offer">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            {offers.map((offer, index) => (
                <GridItem key={index}>
                    <SmallOfferCard offer={offer} />
                </GridItem>
            ))}
            <GridItem>
                <SmallOfferCardLoader />
            </GridItem>
            <GridItem>
                <SmallOfferCardLoader />
            </GridItem>
        </Grid>
    </Wrapper>
);
