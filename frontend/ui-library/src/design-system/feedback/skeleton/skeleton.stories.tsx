import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'Feedback/Skeleton',
    component: Skeleton,
};

export default meta;

export const Base = () => (
    <Wrapper title="Skeleton">
        <Grid size={{ base: 1, sm: 2, md: 3 }}>
            <GridItem>
                <Skeleton />
            </GridItem>
            <GridItem>
                <Skeleton color="dark" />
            </GridItem>
            <GridItem>
                <Skeleton color="blue" />
            </GridItem>
            <GridItem>
                <Skeleton color="green" />
            </GridItem>
            <GridItem>
                <Skeleton color="red" />
            </GridItem>
        </Grid>
    </Wrapper>
);
