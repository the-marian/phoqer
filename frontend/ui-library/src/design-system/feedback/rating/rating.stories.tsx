import { Meta } from '@storybook/react';
import { Text } from 'src/design-system/foundation';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Rating } from './rating';

const meta: Meta<typeof Rating> = {
    title: 'Feedback/Rating',
    component: Rating,
};

export default meta;

export const Base = () => (
    <Wrapper title="Avatar">
        <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            <GridItem>
                <Text>Read only</Text>
                <Rating readonly length={5} value={2.15} />
            </GridItem>

            <GridItem>
                <Text>Hover</Text>
                <Rating />
            </GridItem>

            <GridItem>
                <Text>Disabled</Text>
                <Rating disabled value={3.7} />
            </GridItem>
        </Grid>
    </Wrapper>
);
