import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Chips } from './chips';

const meta: Meta<typeof Chips> = {
    title: 'Data Display/Chips',
    component: Chips,
};

export default meta;

export const Base = () => (
    <Wrapper title="Chips">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            <GridItem>
                <Chips>Apple</Chips>
            </GridItem>

            <GridItem>
                <Chips>Banana</Chips>
            </GridItem>

            <GridItem>
                <Chips>Orange</Chips>
            </GridItem>

            <GridItem>
                <Chips isNew>Potato</Chips>
            </GridItem>

            <GridItem>
                <Chips isNew>Cucumber</Chips>
            </GridItem>
        </Grid>
    </Wrapper>
);
