import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { OfferCard } from './offer-card';
import { OfferCardLoader } from './offer-card-loader';
import offers from './offer-card.mock.json';

const meta: Meta<typeof OfferCard> = {
    title: 'Templates/Offer',
    component: OfferCard,
};

export default meta;

export const Base = () => (
    <Wrapper title="Offer Card">
        <Grid size={{ base: 1, sm: 2, md: 5, lg: 5 }}>
            <GridItem>
                <OfferCard offer={offers[0]} />
            </GridItem>
            <GridItem>
                <OfferCard offer={offers[1]} />
            </GridItem>
            <GridItem>
                <OfferCardLoader />
            </GridItem>
            <GridItem>
                <OfferCardLoader />
            </GridItem>
        </Grid>
    </Wrapper>
);
