import { useState } from 'react';

import { Meta } from '@storybook/react';
import { Grid, GridItem } from 'src/design-system/layout';
import { Wrapper } from 'src/storybook/wrapper';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Inputs/Checkbox',
    component: Checkbox,
};

export default meta;

export const Checkboxes = () => {
    const [value, setValue] = useState(false);

    const handleChange = () => {
        setValue(prev => !prev);
    };

    return (
        <Wrapper title="Checkbox | Base">
            <Grid size={{ base: 1, sm: 2, lg: 3 }}>
                <GridItem>
                    <Checkbox size="sm" checked={value} onChange={handleChange} />
                </GridItem>
                <GridItem>
                    <Checkbox size="sm" checked={value} onChange={handleChange} label="Checkbox label" />
                </GridItem>
                <GridItem>
                    <Checkbox size="sm" checked={value} onChange={handleChange} label="Checkbox label" isDisabled />
                </GridItem>

                <GridItem>
                    <Checkbox checked={value} onChange={handleChange} />
                </GridItem>
                <GridItem>
                    <Checkbox checked={value} onChange={handleChange} label="Checkbox label" />
                </GridItem>
                <GridItem>
                    <Checkbox checked={value} onChange={handleChange} label="Checkbox label" isDisabled />
                </GridItem>

                <GridItem>
                    <Checkbox size="lg" checked={value} onChange={handleChange} />
                </GridItem>
                <GridItem>
                    <Checkbox size="lg" checked={value} onChange={handleChange} label="Checkbox label" />
                </GridItem>
                <GridItem>
                    <Checkbox size="lg" checked={value} onChange={handleChange} label="Checkbox label" isDisabled />
                </GridItem>
            </Grid>
        </Wrapper>
    );
};
