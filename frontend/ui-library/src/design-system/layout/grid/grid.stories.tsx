import { Meta } from '@storybook/react';
import { Wrapper } from 'src/storybook/wrapper';

import { Grid } from './grid';
import { GridItem } from './grid-item';

const meta: Meta<typeof Grid> = {
    title: 'Layout/Grid',
    component: Grid,
};

export default meta;

const styles = `<style>
.grid-item {
    height: 10rem;
}
</style>`;

export const Base = () => {
    return (
        <Wrapper title="Grid | Base" styles={styles}>
            <Grid size={4}>
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
            </Grid>
        </Wrapper>
    );
};

export const Media = () => {
    return (
        <Wrapper title="Grid | Media" styles={styles}>
            <Grid size={{ base: 2, md: 4, lg: 8 }}>
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
                <GridItem />
            </Grid>
        </Wrapper>
    );
};
