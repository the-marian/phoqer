import { Meta } from '@storybook/react';
import { Skeleton } from 'src/design-system/feedback';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Label } from './label';

const meta: Meta<typeof Label> = {
    title: 'Foundation/Label',
    component: Label,
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
            <Grid size={{ base: 1, sm: 2, lg: 3 }}>
                <GridItem>
                    <Label label="Quisquam quod quos sint soluta suscipit voluptates" />
                </GridItem>

                <GridItem>
                    <Label label="Quisquam quod quos sint soluta suscipit voluptates" isRequired>
                        <Skeleton className="box" />
                    </Label>
                </GridItem>

                <GridItem>
                    <Label label="Quisquam quod quos sint soluta suscipit voluptates" isRequired>
                        <Skeleton className="box" />
                    </Label>
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
