import { Meta } from '@storybook/react';
import { Skeleton } from 'src/design-system/feedback';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { ErrorLabel } from './error-label';

const meta: Meta<typeof ErrorLabel> = {
    title: 'Foundation/ErrorLabel',
    component: ErrorLabel,
};

export default meta;

const styles = `<style>
.box {
    width: 100%;
    height: 6rem;
}
</style>`;

export const Base = () => {
    return (
        <Wrapper title="ErrorLabel | Base" styles={styles}>
            <Grid size={{ base: 1, sm: 2 }}>
                <GridItem>
                    <Skeleton className="box" />
                    <ErrorLabel>Quisquam quod quos sint soluta suscipit voluptates</ErrorLabel>
                </GridItem>

                <GridItem>
                    <Skeleton className="box" />
                    <ErrorLabel isFilled>Quisquam quod quos sint soluta suscipit voluptates</ErrorLabel>
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
