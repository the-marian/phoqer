import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Button } from 'src/design-system/inputs';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Loader } from './loader';

const meta: Meta<typeof Loader> = {
    title: 'Feedback/Loaders',
    component: Loader,
};

export default meta;

const styles = `<style>
.container {
    height: 40rem;
    background: var(--primary-blue-500);
}
.btn {
    margin-bottom: 2rem;
    z-index: 1001;
}
</style>`;

export const Base = () => {
    const [fixed, setFixed] = useState(false);
    return (
        <Wrapper title="Loader" styles={styles}>
            <Button className="btn" onClick={() => setFixed(prev => !prev)}>
                {fixed ? 'Fixed position' : 'In container'}
            </Button>

            <Grid size={{ base: 1, sm: 2, md: 3, lg: 5 }}>
                <GridItem className="container">
                    <Loader fixed={fixed} color="primary" />
                </GridItem>

                <GridItem className="container">
                    <Loader color="white" />
                </GridItem>

                <GridItem className="container">
                    <Loader color="black" />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
